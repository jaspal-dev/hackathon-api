import { Transform } from 'class-transformer';

const TrimString = () => {
  return function (object: object, propertyName: string): void {
    Transform(({ value }) => {
      if (value) {
        return value.trim();
      }
      return value;
    })(object, propertyName);
  };
};

export default TrimString;
