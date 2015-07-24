'use strict';

angular.module('ddsApp').controller('FoyerLogementCtrl', function($scope, $http, logementTypes, locationTypes, loyerLabels) {
    var logement = $scope.logement = {
        adresse: {},
        inhabitantForThreeYearsOutOfLastFive: true
    };
    if ($scope.situation.logement) {
        logement = $scope.logement = _.merge(logement, $scope.situation.logement);
    }

    $scope.logementTypes = logementTypes;
    $scope.locationTypes = locationTypes;

    $scope.cityStartsWith = function cityStartsWith(prefix) {
        return logement.adresse.nomCommune.indexOf(prefix.toUpperCase()) === 0;
    };

    $scope.yearsAgo = function yearsAgo(amount) {
        return moment().subtract(amount, 'years').format('MMMM YYYY');
    };

    $scope.captureCharges = function() {
            return (logement.type == 'locataire') && (logement.locationType !== 'meublehotel');
    };

    $scope.loyerLabel = function() {
        var result = loyerLabels[logement.type];
        if (logement.type === 'locataire') {
            if ($scope.captureCharges()) {
                result += ' (hors charges)';
            } else {
                result += ' (charges comprises)';
            }
        }

        return result;
    };

    $scope.captureMembreFamilleProprietaire = function() {
        return 'locataire' === logement.type && angular.isDefined(logement.colocation);
    };

    $scope.capturePretConventionne = function() {
        return true === logement.primoAccedant;
    };

    $scope.captureLocationType = function() {
        return 'locataire' === logement.type && angular.isDefined(logement.membreFamilleProprietaire);
    };

    $scope.captureChambre = function() {
        return 'locataire' === logement.type && 'foyer' !== logement.locationType && angular.isDefined(logement.locationType);
    };

    $scope.captureLoyer = function() {
        if ('gratuit' === logement.type) {
            return false;
        }

        return _.any([
            true === logement.primoAccedant && angular.isDefined(logement.pretConventionne),
            'foyer' === logement.locationType,
            angular.isDefined(logement.isChambre)
        ]);
    };

    $scope.captureCodePostal = function() {
        return _.any([
            false === logement.primoAccedant || true === logement.primoAccedant && angular.isDefined(logement.pretConventionne),
            'foyer' === logement.locationType,
            angular.isDefined(logement.isChambre),
            'gratuit' === logement.type,
            'sansDomicile' === logement.type
        ]);
    };

    $scope.changeLogementType = function() {
        ['colocation', 'locationType', 'membreFamilleProprietaire', 'primoAccedant', 'loyer', 'charges', 'isChambre'].forEach(function(field) {
            delete logement[field];
        });
    };

    $scope.updateCities = function updateCities() {
        $scope.retrievingCities = true;

        $http.get('/api/outils/communes/' + $scope.postalCode)
             .then(function(result) {
                  $scope.cities = result.data;
                  logement.adresse = $scope.cities[0];
              }, console.error.bind(console)
              ).finally(function() {
                  $scope.retrievingCities = false;
              });
    };

    $scope.submit = function(form) {
        $scope.submitted = true;
        if (form.$valid && logement.adresse) {
            $scope.$emit('logement', logement);
        }
    };
});
