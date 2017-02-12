/**
 * Update the progress bar with given id. The amount param is the new value for progress bar and total is a numeric value for graphic needs.
 * @param  {String} id     Progress bar id
 * @param  {Int} amount Numeric amount
 * @param  {Int} total  Total value
 * @return {void}        
 */
function updateProgressBar(id, amount, total) {
  console.log("New progress bar [" + id + "] value: " + amount + "%");
  $("#" + id).progressbar({
    display_text: 'center',
    use_percentage: false,
    amount_format: function(p, t) {
      // Calculates the percentage of amount on total
      return p * total / t + '/' + total;
    }
  });
}
Template.progress_bar.onCreated(function onCreated() {
  // Amount and total reactive vars
  this.amount = new ReactiveVar(0);
  this.total = new ReactiveVar(0);
});

Template.progress_bar.onRendered(function onRendered() {
  // Update reactive vars with initial values and update progress bar
  Template.instance().amount.set(this.data.amount);
  Template.instance().total.set(this.data.total);
  updateProgressBar(this.progress_bar_id, this.data.amount, this.data.total);
});

Template.progress_bar.helpers({
  /**
   * Gets the amount value for "transitiongoal" data
   * @return {Int} Transition goal data for html
   */
  amountValue() {
    var amount = this.amount;
    Template.instance().amount.set(amount);
    return amount;
  },
  /**
   * Update progress bar with new values
   * @return {[type]} [description]
   */
  updatedValue() {
    var amount = Template.instance().amount.get();
    var total = Template.instance().total.get();

    updateProgressBar(this.progress_bar_id, amount, total);
  }
});