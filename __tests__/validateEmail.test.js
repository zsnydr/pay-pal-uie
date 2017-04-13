import validateEmail from '../public/send/validateEmail';

describe('Validate Email', () => {
  it('should accept a valid email address', () => {
    const email = 'zack@snyder.com';
    const result = validateEmail(email);
    expect(result).toBe(true);
  });

  it('should reject an email address without an "@" sign', () => {
    const email = 'zacksnyder.com';
    const result = validateEmail(email);
    expect(result).toBe(false);
  });

  it('should reject an email address without ".com"', () => {
    const email = 'zack@snyder';
    const result = validateEmail(email);
    expect(result).toBe(false);
  });
});
