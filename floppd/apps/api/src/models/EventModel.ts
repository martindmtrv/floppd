import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

let EventSchema = Schema({
  title: { type: String, required: true },
  organizer: { type: String, required: true },
  description: String,
  location: { type: String, required: true },
  date: { type: Date, required: true },
  attending: [{ type: String, required: true }],
  flopping: [{ type: String, required: true }],
  hasAnswered: [{ type: String, required: true }],
});

EventSchema.methods.flop = function (user: string) {
  this.flopping.push(user);
};

EventSchema.methods.attend = function (user: string) {
  this.attending.push(user);
};

EventSchema.methods.hasReplied = function (
  id: string,
  cb: (b: boolean) => void
) {
  cb(this.hasAnswered.includes(id));
};

export default mongoose.model('Event', EventSchema);
