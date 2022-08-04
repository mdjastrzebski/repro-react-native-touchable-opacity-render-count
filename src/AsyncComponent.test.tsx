import * as React from "react";
import TestRenderer, { act, ReactTestRenderer } from "react-test-renderer";
import { AsyncComponent } from "./AsyncComponent";

test("Async action render count", async () => {
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

  const label = renderer.root.findByProps({ testID: "output" });
  expect(label.props.children).toEqual(["Count: ", 0]);

  await act(async () => {
    const button = renderer.root.findByProps({ testID: "button" });
    button.props.onPress();
    await sleep(100);
  });

  expect(label.props.children).toEqual(["Count: ", 1]);

  // Needed as otherwise, there will be endless renders event after test finishes
  act(() => {
    renderer.unmount();
  });

  console.log(`Renders summary: count=${count}, duration=${duration}`);
  expect(count).toEqual(2);
});

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
