import { fireEvent, render, screen } from "@testing-library/react";
import FeedbackForm from "./FeedbackForm";

describe("Feedback Form", () => {
  test("User is able to submit the form if the score is lower than 5 and additional feedback is provided", () => {
    const score = "3";
    const comment = "The pizza crust was too thick";
   
    //这行代码创建了一个jest的mock函数，这意味着当FeedbackForm组件中的表单提交时，
    //它将使用这个mock函数来代替实际的提交函数。
    const handleSubmit = jest.fn();

    //// 渲染FeedbackForm组件，并将handleSubmit作为onSubmit的prop
    render(<FeedbackForm onSubmit={handleSubmit} />);

    // You have to write the rest of the test below to make the assertion pass

    // // 通过标签文本获取评分输入控件
    const rangeInput = screen.getByLabelText(/Score:/);
    //fireEvent是React Testing Library提供的一个工具，用于模拟用户在页面上的行为，
    //比如点击按钮或更改输入框中的文本
    fireEvent.change(rangeInput, { target: { value: score } });    // 更改评分输入控件的值为4

    const textArea = screen.getByLabelText(/Comments:/);
    fireEvent.change(textArea, { target: { value: comment } });
    
    const submitButton = screen.getByRole("button");
    fireEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledWith({
      score,
      comment,
    });
  });

  test("User is able to submit the form if the score is higher than 5, without additional feedback", () => {
    const score = "9";
    const handleSubmit = jest.fn();
    render(<FeedbackForm onSubmit={handleSubmit} />);

    // You have to write the rest of the test below to make the assertion pass
    const rangeInput = screen.getByLabelText(/Score:/);
    fireEvent.change(rangeInput, { target: { value: score } });

    const submitButton = screen.getByRole("button");
    fireEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledWith({
      score,
      comment: "",
    });
  });
});
