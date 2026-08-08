export class UpdateTodoDto {
  private constructor(
    public readonly id: number,
    public readonly text: string,
    public readonly completedAt?: Date,
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.text) {
      returnObj.text = this.text;
    }

    if (this.completedAt) {
      returnObj.completedAt = this.completedAt;
    }

    return returnObj;
  }

  static create(props: { [key: string]: any }): [string?, UpdateTodoDto?] {
    const { id, text, completedAt } = props;

    const numericId = Number(id);

    if (!id || isNaN(numericId)) {
      return ["Invalid id", undefined];
    }

    let newCompletedAt = completedAt;

    if (completedAt) {
      newCompletedAt = new Date(completedAt);

      if (newCompletedAt.toString() === "Invalid Date") {
        return ["Invalid completedAt", undefined];
      }
    }

    return [undefined, new UpdateTodoDto(numericId, text, newCompletedAt)];
  }
}
