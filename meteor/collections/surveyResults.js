SurveyResults = new Mongo.Collection('surveyResults');
console.log("Init surveyResults");

/**
* Find surveyResults with given userId and bias
* @param  {Int} userId Id of survey owner user
* @param  {String} bias  Bias of survey
* @return {[SurveyResults]}        List of found surveyResults
*/
SurveyResults.byUserIdAndBias = function(userId, bias) {
	return SurveyResults.find({
		userId: userId,
		bias: bias
	});
}

/**
 * Create a new result for survey SURVEY_FRAMING_EFFECT_KEY and given user
 * @param  {String} userId Id of result's user
 * @param  {Json} data   Json object containing survey result data
 * @return {SurveyResults}        The newly created object
 */
SurveyResults.createSurvey1Result = function(userId, data) {
	return SurveyResults.createSurveyResult(userId, SURVEY_FRAMING_EFFECT_KEY, data);
}

/**
 * Create a new result for survey SURVEY_CERTAINTY_EFFECT_KEY and given user
 * @param  {String} userId Id of result's user
 * @param  {Json} data   Json object containing survey result data
 * @return {SurveyResults}        The newly created object
 */
SurveyResults.createSurvey2Result = function(userId, data) {
	return SurveyResults.createSurveyResult(userId, SURVEY_CERTAINTY_EFFECT_KEY, data);
}

/**
 * Create a new survey result for userId
 * @param  {Int} userId Id of result's user
 * @param  {String} bias  Bias of filled survey (SURVEY_FRAMING_EFFECT_KEY or SURVEY_CERTAINTY_EFFECT_KEY)
 * @param  {Json} data   Json object containing survey result data
 * @return {SurveyResults}        The newly created object
 */
SurveyResults.createSurveyResult = function(userId, bias, data) {
	var surveyResultsData = {
		userId: userId,
		bias: bias,
		data: data
	};
	return SurveyResults.insert(surveyResultsData);
};