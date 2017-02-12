SURVEY_PERSONAL_DATA_KEY = "PERSONAL_DATA";

SURVEY_FRAMING_EFFECT_KEY = "FRAMING";
SURVEY_CERTAINTY_EFFECT_KEY = "CERTAINTY";
SURVEY_REFLECTION_EFFECT_KEY = "REFLECTION";

// Json object containing the questions for two final surveys
survey_questions = {};

var survey_personal_data = [
{
	id: "firstname",
	type: "TEXT",
	options: [{
		label_en: "First Name",
		label_it: "Nome"
	}]
},{
	id: "lastname",
	type: "TEXT",
	options: [{
		label_en: "Last Name",
		label_it: "Cognome"
	}]
},{
	question_en: "What's your job?",
	question_it: "Qual è la tua occupazione?",
	id: "job",
	type: "TEXT",
	options: [{
		label_en: "Job",
		label_it: "Occupazione"
	}]
},{
	question_en: "What's your education level?",
	question_it: "Qual è il tuo titolo di studio?",
	id: "education_level",
	type: "TEXT",
	options: [{
		label_en: "Education level",
		label_it: "Titolo di studio"
	}]
},{
	id: "age",
	type: "TEXT",
	options: [{
		label_en: "Age",
		label_it: "Età"
	}]
}, {
	question_en: "Gender",
	question_it: "Genere",
	id: "gender",
	type: "RADIO",
	options: [{
		label_en: "Male",
		label_it: "Maschio",
		value: "Male"
	}, {
		label_en: "Female",
		label_it: "Femmina",
		value: "Female"
	}]
}, {
	question_en: "Do you usually play videogames?",
	question_it: "Giochi abitualmente con i videogiochi?",
	id: 5,
	type: "RADIO",
	options: [{
		label_en: "Yes",
		label_it: "Sì",
		value: "Yes"
	}, {
		label_en: "No",
		label_it: "No",
		value: "No"
	}]
}, {
	question_en: "Have you played to money games, in the last year?",
	question_it: "Hai svolto giochi a soldi nell'ultimo anno?",
	id: 6,
	type: "RADIO",
	options: [{
		label_en: "Yes",
		label_it: "Sì",
		value: "Yes"
	}, {
		label_en: "No",
		label_it: "No",
		value: "No"
	}]
}];
survey_questions[SURVEY_PERSONAL_DATA_KEY] = survey_personal_data;
var survey_framing = [{
	question_en: "Question " + SURVEY_FRAMING_EFFECT_KEY + " 1: Text",
	question_it: "Domanda " + SURVEY_FRAMING_EFFECT_KEY + " 1: Testo",
	id: 1,
	type: "RADIO",
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
	type: "RADIO",
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
	question_en: "Question " + SURVEY_CERTAINTY_EFFECT_KEY + ": Text",
	question_it: "Domanda " + SURVEY_CERTAINTY_EFFECT_KEY + ": Testo",
	id: 3,
	type: "RADIO",
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
	question_en: "Question " + SURVEY_CERTAINTY_EFFECT_KEY + " 2: Text",
	question_it: "Domanda " + SURVEY_CERTAINTY_EFFECT_KEY + " 2: Testo",
	id: 4,
	type: "RADIO",
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
survey_questions[SURVEY_CERTAINTY_EFFECT_KEY] = survey_certainty;
var survey_reflection = [{
	question_en: "Question " + SURVEY_REFLECTION_EFFECT_KEY + ": Text",
	question_it: "Domanda " + SURVEY_REFLECTION_EFFECT_KEY + ": Testo",
	id: 5,
	type: "RADIO",
	options: [{
		label_en: "5",
		label_it: "5",
		value: "5"
	}, {
		label_en: "6",
		label_it: "6",
		value: "6"
	}]
}, {
	question_en: "Question " + SURVEY_REFLECTION_EFFECT_KEY + " 2: Text",
	question_it: "Domanda " + SURVEY_REFLECTION_EFFECT_KEY + " 2: Testo",
	id: 6,
	type: "RADIO",
	options: [{
		label_en: "5",
		label_it: "5",
		value: "5"
	}, {
		label_en: "6",
		label_it: "6",
		value: "6"
	}]
}];
survey_questions[SURVEY_REFLECTION_EFFECT_KEY] = survey_reflection;