export class Book {
    public isbn: string;
    public name: string;
   public taken: boolean;


  constructor(isbn: string) {
    this.isbn = isbn;
  }

  getIsbn(): string {
    const dataToReturn = this.isbn;
    return dataToReturn;
  }


   getName(): string {
    return this.name;
  }

  getTaken(): boolean {
    return this.taken;
  }

  setIsbn(isbn: string): void {
    this.isbn = isbn;
  }
}
