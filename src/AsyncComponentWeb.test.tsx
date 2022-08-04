import * as React from "react";
import TestRenderer, { act, ReactTestRenderer } from "react-test-renderer";

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const AsyncComponent = () => {
  const [count, setCount] = React.useState(0);

  const handlePress = () => {
    setTimeout(() => setCount((c) => c + 1), 10);
  };

  return (
    <a onClick={handlePress}>
      <span id="output">Count: {count}</span>
    </a>
  );
};

test("Async action render count (Web)", async () => {
  let duration = 0;
  let count = 0;
  const handleRender = (id, phase, actualDuration, ...rest) => {
    // console.log("onRender ", id, phase, actualDuration, ...rest);
    duration += actualDuration;
    count += 1;
  };

  let component = (
    <React.Profiler id="Test" onRender={handleRender}>
      <AsyncComponent />
    </React.Profiler>
  );

  let renderer: ReactTestRenderer;
  act(() => {
    renderer = TestRenderer.create(component);
  });

  const label = renderer.root.findByProps({ id: "output" });
  expect(label.props.children).toEqual(["Count: ", 0]);

  await act(async () => {
    const button = renderer.root.findByType("a");
    button.props.onClick();
    await sleep(100);
  });

  expect(label.props.children).toEqual(["Count: ", 1]);

  // Not needed, no further renders will happen
  //   act(() => {
  //     renderer.unmount();
  //   });

  console.log("Total", duration, count);
  expect(count).toEqual(2);
});
