export abstract class Entity {
  constructor(
    public readonly id: string,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}

  public equals(entity: Entity): boolean {
    return this.id === entity.id;
  }

  protected touch(): void {
    this.updatedAt = new Date();
  }
}