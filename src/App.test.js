import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import calculatorForFerryCost from './calculator';
import tripPlanner from './tripPlanner';

test('renders default UI elements', () => {
  render(<App />);

  const title = screen.getByText('Corn & Geese Trip Calculator');
  const input = screen.getByPlaceholderText('Number of bags of corn');
  const image = screen.getByRole('img');
  const button = screen.getByRole('button');

  expect(title).toBeInTheDocument;
  expect(input).toBeInTheDocument;

  expect(image).toBeInTheDocument;
  expect(image).toHaveAttribute('src', './corn.png');

  expect(button).toBeInTheDocument;
  expect(button.textContent).toEqual('Calculate');
});

// Actually an integration test, might mock out calls at some point
test('on button click for possible result, shows instructions', () => {
  render(<App calculate={calculatorForFerryCost(0.25)} tripPlanner={tripPlanner} />);

  fireEvent.change(screen.getByPlaceholderText("Number of bags of corn"), {
    target: { value: "1" }
  });
  fireEvent.change(screen.getByPlaceholderText("Number of geese"), {
    target: { value: "1" }
  });
  fireEvent.click(screen.getByRole('button'));

  const willTake = screen.getByText('It will take');
  const costOf = screen.getByText('At a cost of');
  const input = screen.getAllByRole('textbox');
  const instructionsTitle = screen.getByText('Trip instructions');
  const instructions = screen.getAllByRole('listitem');
  const inputs = screen.getByText('Result for 1 bag of corn and 1 goose:');

  expect(willTake).toBeInTheDocument;
  expect(costOf).toBeInTheDocument;
  expect(instructionsTitle).toBeInTheDocument;
  expect(inputs).toBeInTheDocument;

  expect(input[0].value).toEqual('3 ferry trips');
  expect(input[1].value).toEqual('£0.75');

  expect(instructions[0].textContent).toEqual('Carry a sack of corn to the market shore');
  expect(instructions[1].textContent).toEqual('Carry nothing back home');
  expect(instructions[2].textContent).toEqual('Carry a goose to the market shore');
});


test('on button click for impossible result, error', () => {
  render(<App calculate={calculatorForFerryCost(0.25)} tripPlanner={tripPlanner} />);

  fireEvent.change(screen.getByPlaceholderText("Number of bags of corn"), {
    target: { value: "10" }
  });
  fireEvent.change(screen.getByPlaceholderText("Number of geese"), {
    target: { value: "10" }
  });
  fireEvent.click(screen.getByRole('button'));

  const notPossible = screen.getByText('Not possible!');
  const inputs = screen.getByText('Result for 10 bags of corn and 10 geese:');

  expect(notPossible).toBeInTheDocument;
  expect(inputs).toBeInTheDocument;
});