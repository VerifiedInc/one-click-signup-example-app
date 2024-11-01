import { randomUUID } from 'crypto';
import { existsSync, readFileSync, writeFileSync } from 'fs';

/**
 * This file contains the persistence layer for the OTP verification codes.
 * It provides functions to read, write, create, find, and remove OTP verification codes.
 * Normally, this data would be stored in a database, but for the sake of simplicity in this example,
 * we are using a JSON file to store the data.
 */

export interface VerificationCode {
  uuid: string;
  phone: string;
  code: string;
  expiresAt: Date;
}

const filePath = './verificationCodes.json';

export const readData = (): VerificationCode[] => {
  try {
    if (!existsSync(filePath)) {
      console.warn('File does not exist. Returning an empty object.');
      return [];
    }
    const fileContents = readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContents) as VerificationCode[];
  } catch (error) {
    console.error('Error reading file:', error);
    throw new Error('Error reading file');
  }
};

const writeData = (data: VerificationCode[]): void => {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    console.log(jsonData);
    writeFileSync(filePath, jsonData, 'utf-8');
    console.log('Data successfully saved.');
  } catch (error) {
    console.error('Error writing to file:', error);
    throw new Error('Error writing to file:');
  }
};

export const persistOtp = (
  payload: Omit<VerificationCode, 'uuid'>,
): VerificationCode => {
  try {
    const data = readData(); // Read existing data
    const newEntry = {
      uuid: randomUUID(),
      ...payload,
    };
    data.push(newEntry);
    // Write the updated data back to the file
    writeData(data);
    console.log('New entry added successfully: ', newEntry);

    return newEntry;
  } catch (error) {
    console.error('Error adding new entry:', error);
    throw new Error('Error adding new entry');
  }
};

// Function to find an entry by phone and code
export const findByPhoneAndCode = (
  phone: string,
  code: string,
): VerificationCode | undefined => {
  try {
    const data = readData();
    return data.find((entry) => entry.phone === phone && entry.code === code);
  } catch (error) {
    console.error('Error finding entry by phone and code:', error);
    throw new Error('Error reading entry by phone and code');
  }
};

// Function to remove an entry by UUID
export const removeByUuid = (uuid: string): void => {
  try {
    const data = readData();
    const updatedData = data.filter((entry) => entry.uuid !== uuid);
    if (data.length === updatedData.length) {
      console.warn('No entry found with the specified UUID.');
    } else {
      writeData(updatedData);
      console.log('Entry removed successfully.');
    }
  } catch (error) {
    console.error('Error removing entry by UUID:', error);
    throw new Error('Error removing entry by UUID');
  }
};
