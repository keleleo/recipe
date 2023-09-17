import { Types } from 'mongoose';

const SITE_BASE_URL = process.env.SITE_BASE_URL || '';
export function imgFromReceId(id: Types.ObjectId) {
  return `${SITE_BASE_URL}/images/recipe/${id.toString()}.jpg`
}