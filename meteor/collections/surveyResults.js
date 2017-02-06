SurveyResults = new Mongo.Collection('surveyResults');
console.log("Init surveyResults");

/**
* Find surveyResults with given userId and index
* @param  {Int} userId Id of survey owner user
* @param  {String} index  Index of survey
* @return {[SurveyResults]}        List of found surveyResults
*/
SurveyResults.byUserIdAndIndex = function(userId, index) {
	return SurveyResults.find({
		userId: userId,
		index: index
	});
}

/**
 * Create a new result for survey "1" and given user
 * @param  {String} userId Id of result's user
 * @param  {Json} data   Json object containing survey result data
 * @return {SurveyResults}        The newly created object
 */
SurveyResults.createSurvey1Result = function(userId, data) {
	return SurveyResults.createSurveyResult(userId, "1", data);
}

/**
 * Create a new result for survey "2" and given user
 * @param  {String} userId Id of result's user
 * @param  {Json} data   Json object containing survey result data
 * @return {SurveyResults}        The newly created object
 */
SurveyResults.createSurvey2Result = function(userId, data) {
	return SurveyResults.createSurveyResult(userId, "2", data);
}

/**
 * Create a new survey result for userId
 * @param  {Int} userId Id of result's user
 * @param  {String} index  Index of filled survey ("1" or "2")
 * @param  {Json} data   Json object containing survey result data
 * @return {SurveyResults}        The newly created object
 */
SurveyResults.createSurveyResult = function(userId, index, data) {
	var surveyResultsData = {
		userId: userId,
		index: index,
		data: data
	};
	return SurveyResults.insert(surveyResultsData);
};