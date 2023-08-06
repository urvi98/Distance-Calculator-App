export function addPoint(point) {
    return {
      type: 'ADD_POINT',
      payload: point,
    };
  }  

  export const RESET_POINTS = 'RESET_POINTS';

export const resetPoints = () => ({
  type: RESET_POINTS,
});
