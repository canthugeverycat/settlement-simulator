import { MONTHS } from '../globals/const';

/**
 * Transform datestring to a human readable date and time
 * @param   {string}  date  Date string
 * @return  {string} (ex. 'May 19, 2019 12:42')
 */
export const getHumanReadableDatetime = (date: string): string => {
  const d = new Date(date);

  const day = d.getDate();
  const month = MONTHS[d.getMonth()].slice(0, 3);
  const year = d.getFullYear();
  const hour = d.getHours();
  const minute = d.getMinutes();

  return `${month} ${day}, ${year}, ${hour}:${minute < 10 ? '0' + minute : minute}`;
};
