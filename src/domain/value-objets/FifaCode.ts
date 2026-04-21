export class FifaCode {
  value: string;

  constructor(value: string) {
    if (!/^[A-Z]{3}$/.test(value)) {
      throw new Error("Invalid FIFA Code format");
    }
    this.value = value;
  }

  equals(other: FifaCode): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}