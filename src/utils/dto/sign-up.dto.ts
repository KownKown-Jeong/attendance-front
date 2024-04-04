// src/utils/dto/sign-up.dto.ts
export interface APerson {
  user: string;
  name: string;
  gender: Gender;
  date_of_birth: Date;
  phone_number: string;
  address: string;
  tags: string[];
}

export interface FamilyMember {
  aPerson: APerson;
  relationship: Relationship;
}

export interface SignUpDto {
  aPerson: APerson;
  password: string;
  familyMembers: FamilyMember[];
}

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

enum Relationship {
  FATHER = 'father',
  MOTHER = 'mother',
  FATHER_IN_LAW = 'father_in_law',
  MOTHER_IN_LAW = 'mother_in_law',
  SON = 'son',
  DAUGHTER = 'daughter',
  HUSBAND = 'husband',
  WIFE = 'wife',
  BROTHER = 'brother',
  YOUNGER_BROTHER = 'younger_brother',
  SISTER = 'sister',
  YOUNGER_SISTER = 'younger_sister',
  FRIEND = 'friend',
  GRANDFATHER = 'grandfather',
  GRANDMOTHER = 'grandmother',
  GRANDSON = 'grandson',
  GRANDDAUGHTER = 'granddaughter',
  UNCLE = 'uncle',
  AUNT = 'aunt',
  NEPHEW = 'nephew',
  NIECE = 'niece',
  COUSIN = 'cousin',
  RELATIVE = 'relative',
}
