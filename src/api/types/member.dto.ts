export interface JoinMemberRequestDto {
  name: string;
  city?: string;
  street?: string;
  zipcode?: string;
}

export interface AddressDto {
  city?: string;
  street?: string;
  zipcode?: string;
}

export interface MemberDto {
  id: number;
  name: string;
  address: AddressDto;
}