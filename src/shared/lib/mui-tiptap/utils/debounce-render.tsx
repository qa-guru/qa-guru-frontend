import type { DebounceSettings, DebouncedFunc } from "lodash";
import debounce from "lodash/debounce";
import { Component } from "react";

export type DebounceRenderProps = {
  wait?: number;
  options?: DebounceSettings;
  children: React.ReactNode;
};

export default class DebounceRender extends Component<DebounceRenderProps> {
  public updateDebounced: DebouncedFunc<() => void>;

  constructor(props: DebounceRenderProps) {
    super(props);
    this.updateDebounced = debounce(
      this.forceUpdate,
      props.wait ?? 170,
      props.options ?? {
        leading: true,
        trailing: true,
        maxWait: 300,
      }
    );
  }

  shouldComponentUpdate() {
    this.updateDebounced();
    return false;
  }

  componentWillUnmount() {
    this.updateDebounced.cancel();
  }

  render() {
    return this.props.children;
  }
}
