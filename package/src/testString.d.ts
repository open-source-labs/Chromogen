import { RecoilState, RecoilValueReadOnly } from 'recoil';

type writeables<T> = Array<RecoilState<T>>;
type readables<T> = Array<RecoilValueReadOnly<T>>;
type selectorsArr = Array<{ key: string; newValue: any }>;
type snapshots = Array<{
  state: { key: string; value: any }[];
  selectors: selectorsArr;
}>;

export default function output(
  writeables: writeables<any>,
  readables: readables<any>,
  snapshots: snapshots,
  initialRender: selectorsArr,
): string;
