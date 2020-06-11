// eslint-disable-next-line import/prefer-default-export
export const asyncForeach = async (array, callback) => {
  for (let i = 0; i < array.length; i += 1) {
    await callback(array[i]);
  }
};
