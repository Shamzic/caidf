'use strict';

angular.module('ddsApp').controller('FoyerCtrl', function($scope, $state, $filter, SituationService, IndividuService) {
    var situation = $scope.situation = SituationService.restoreLocal();
    $scope.statutsSpecifiques = IndividuService.formatStatutsSpecifiques;
    $scope.nationalite = IndividuService.nationaliteLabel;
    $scope.getLabel = IndividuService.label;

    $scope.$on('individu.demandeur', function(e, demandeur) {
        if (_.find(situation.individus, { role: 'demandeur' })) {
            situation.individus[0] = demandeur;
        } else {
            situation.individus.push(demandeur);
        }
        $state.go('foyer.conjoint');
    });

    $scope.$on('individu.conjoint', function(e, conjoint) {
        if (conjoint) {
            // si le conjoint existait déjà avant, on l'écrase
            if (_.find(situation.individus, { role: 'conjoint' })) {
                situation.individus[1] = conjoint;
            } else { // on insère le conjoint juste derrière le demandeur dans l'array des individus
                situation.individus.splice(1, 0, conjoint);
            }
        } else { // on supprime l'éventuel conjoint qui existait avant
            situation.individus = _.filter(situation.individus, function(individu) {
                return 'conjoint' !== individu.role;
            });
        }
        $state.go('foyer.enfants');
    });

    $scope.$on('enfants', function(e, enfants) {
        situation.individus = _.filter(situation.individus, function(individu) {
            return 'enfant' !== individu.role;
        });
        situation.individus.push.apply(situation.individus, enfants);
        $state.go('foyer.personnesACharge');
    });

    $scope.$on('personnesACharge', function(e, personnesACharge) {
        situation.individus = _.filter(situation.individus, function(individu) {
            return 'personneACharge' !== individu.role;
        });
        situation.individus.push.apply(situation.individus, personnesACharge);
        $state.go('foyer.logement');
    });

    $scope.$on('logement', function(e, logement) {
        situation.logement = logement;
        $scope.$broadcast('logementCaptured');
        $state.go('foyer.ressources.types');
    });

    $scope.$on('ressourcesValidated', function() {
        $scope.situation.ressourcesCaptured = true;
        $scope.$broadcast('ressourcesCaptured');
        $state.go('foyer.patrimoine');
    });

    $scope.$on('patrimoine', function(e, patrimoine) {
        situation.patrimoine = patrimoine;
        $scope.$broadcast('patrimoineCaptured');
        SituationService.save(situation).then(function(result) {
            $state.go('foyer.simulation', { 'situationId': result._id });
        });
    });
});
