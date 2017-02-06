SURVEY_FRAMING_EFFECT_KEY = "FRAMING";
SURVEY_CERTAINTY_EFFECT_KEY = "CERTAINTY";
SURVEY_REFLECTION_EFFECT_KEY = "REFLECTION";

// Json object containing the questions for two final surveys
survey_questions = {};

var survey_framing = [{
	question_en: "Question " + SURVEY_FRAMING_EFFECT_KEY + " 1: Text",
	question_it: "Domanda " + SURVEY_FRAMING_EFFECT_KEY + " 1: Testo",
	id: 1,
	options: [{
		label_en: "1",
		label_it: "1",
		value: "1"
	}, {
		label_en: "2",
		label_it: "2",
		value: "2"
	}]
}, {
	question_en: "Question " + SURVEY_FRAMING_EFFECT_KEY + " 2: Text",
	question_it: "Domanda " + SURVEY_FRAMING_EFFECT_KEY + " 2: Testo",
	id: 2,
	options: [{
		label_en: "1",
		label_it: "1",
		value: "1"
	}, {
		label_en: "2",
		label_it: "2",
		value: "2"
	}]
}];
survey_questions[SURVEY_FRAMING_EFFECT_KEY] = survey_framing;
var survey_certainty = [{
	question_en: "Question 3: Text",
	question_it: "Domanda 3: Testo",
	id: 3,
	options: [{
		label_en: "3",
		label_it: "3",
		value: "3"
	}, {
		label_en: "4",
		label_it: "4",
		value: "4"
	}]
}, {
	question_en: "Question 4: Text",
	question_it: "Domanda 4: Testo",
	id: 4,
	options: [{
		label_en: "3",
		label_it: "3",
		value: "3"
	}, {
		label_en: "4",
		label_it: "4",
		value: "4"
	}]
}];
survey_questions[SURVEY_CERTAINTY_EFFECT_KEY] = survey_certainty