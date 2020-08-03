import { IEvent } from '../event-creator/event-creator';

export const TestEvent: IEvent = {
  organizer: 'Martin Dimitrov',
  date: new Date('2020-09-03T16:30:00.000Z'),
  location: '23 Northview Road',
  title: 'Test event',
  description:
    'This is a long description of events to come, it will be so much fun you should totally not flop on this. blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah ',
  attending: ['Martin Dimitrov', 'John', 'Sid', 'Homie'],
  flopping: ['Loser', 'Ronald McDonald', 'Some rando'],
};
