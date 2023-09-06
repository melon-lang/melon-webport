import { compile } from 'melon-lang';
import VM, { VMImage } from 'melon-lang/dist/src/vm';

const debug = (value) => {
  return;

  fetch('http://localhost:8080', {
    method: `post`,
    body: value,
  });
};

const interpret = (source: string): VMImage => {
  const program = compile(source);

  debug(JSON.stringify(program));

  const vm = VM.create(program);

  const res = vm.run();

  return res;
};

export default interpret;
