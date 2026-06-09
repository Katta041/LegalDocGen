import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatAddress(r: any) {
  const parts = [r.addressVillage && `${r.addressVillage} Village`, r.addressMandal && `${r.addressMandal} Mandal`, r.addressTown, r.addressDistrict && `${r.addressDistrict} District`, r.addressState].filter(Boolean)
  return parts.length > 0 ? parts.join(', ') : '___'
}

export function formatPetitionerAddress(data: any) {
  const parts = [data.petitionerAddressVillage && `${data.petitionerAddressVillage} Village`, data.petitionerAddressMandal && `${data.petitionerAddressMandal} Mandal`, data.petitionerAddressTown, data.petitionerAddressDistrict && `${data.petitionerAddressDistrict} District`, data.petitionerAddressState].filter(Boolean)
  return parts.length > 0 ? parts.join(', ') : '___'
}
