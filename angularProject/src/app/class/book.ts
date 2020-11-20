export class Book {
    private _isbn: string;
    public name: string;
   public taken: boolean;


  constructor(isbn: string) {
    this._isbn = isbn;
  }


  get isbn(): string {
    return this._isbn;
  }

  getName(): string {
    return this.name;
  }

  getTaken(): boolean {
    return this.taken;
  }

  setIsbn(isbn: string): void {
    this._isbn = isbn;
  }
}
