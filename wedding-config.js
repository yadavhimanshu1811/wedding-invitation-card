/**
 * WEDDING CONFIGURATION RE-EXPORT
 * For editing real details, please open: wedding-details.js
 */

import { WEDDING_DETAILS } from './wedding-details.js';

export const WEDDING_CONFIG = WEDDING_DETAILS;
export default WEDDING_DETAILS;

if (typeof window !== "undefined") {
  window.WEDDING_CONFIG = WEDDING_DETAILS;
  window.WEDDING_DETAILS = WEDDING_DETAILS;
}
