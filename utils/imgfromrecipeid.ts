import { Types } from 'mongoose';
import { getHostPath } from './envUtils';

export function imgFromReceId(id: Types.ObjectId) {
  return `${getHostPath()}images/recipe/${id.toString()}.jpg`
}