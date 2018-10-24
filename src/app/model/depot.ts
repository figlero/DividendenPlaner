import {Stock} from './stock';
import {Position} from './position';

export class Depot {

  positions: Position[];
  uid: string;

  constructor(uid: string) {
    this.positions = [];
    this.uid = uid;
  }

  /*addPosition(position: Position) {
    this.positions.push(position);
  }*/
}
