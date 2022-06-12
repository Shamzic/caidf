import { fillRadio, fillCheckboxes, fillNumber } from "./form"

const fill__interetAidesSanitaireSocial = (expect) => {
  fillRadio("_interetAidesSanitaireSocial", expect)
}

const fill__interetsAidesVelo = (expect) => {
  fillCheckboxes("_interetsAidesVelo", expect)
}

const fill__interetBafa = (expect) => {
  fillRadio("_interetBafa", expect)
}

const fill__interetPermisDeConduire = (expect) => {
  fillRadio("_interetPermisDeConduire", expect)
}

const fill_sortie_region_academique = (outside) => {
  fillRadio("sortie_region_academique", outside)
}

const fill_boursier = (scolarship) => {
  fillRadio("boursier", scolarship)
}

const fill__interetEtudesEtranger = (abroad) => {
  fillRadio("_interetEtudesEtranger", abroad)
}

const fill__dureeMoisEtudesEtranger = (duration) => {
  fillNumber("_dureeMoisEtudesEtranger", duration)
}

const fill__interetVoiture = (value) => {
  fillRadio("_interetVoiture", value)
}

const fill__interetLogement = (value) => {
  fillRadio("_interetLogement", value)
}

const fill__interetEmploi = (value) => {
  fillRadio("_interetEmploi", value)
}

const fill__aleas = (expect) => {
  fillCheckboxes("_aleas", expect)
}


export default {
  fill__interetAidesSanitaireSocial,
  fill__interetsAidesVelo,
  fill__interetBafa,
  fill__interetPermisDeConduire,
  fill_sortie_region_academique,
  fill_boursier,
  fill__interetEtudesEtranger,
  fill__dureeMoisEtudesEtranger,
  fill__interetVoiture,
  fill__interetLogement,
  fill__interetEmploi,
  fill__aleas,
}
