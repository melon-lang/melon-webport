import 'es6-shim';
import 'reflect-metadata';
import interpret from './interpret';
import VM, { VMImage, VMStatus, Value } from 'melon-lang/dist/src/vm';

const debug = (value) => {
  return;

  fetch('http://localhost:8080', {
    method: `post`,
    body: value,
  });
};

const begin = (sourceCode: string): void => {
  const _ = `
    let a = syscall("is.workflow.actions.showresult", "asdas", 1);
    print(a);

    let i = 0; 
    for(let j=0; j<1; j=j+1){
        while(i< 100) 
            i = i + 1;         
    }
    `;

  const source = sourceCode;

  if (!source) {
    console.log('No source code found in query params.');
    return;
  }

  const result = interpret(atob(source));

  document.write(btoa(JSON.stringify(result)));
};

const resume = (save: string, value): void => {
  const image = JSON.parse(atob(save)) as VMImage;
  const vm = VM.deserialize(image, Value.string(atob(value)));
  const result = vm.run();

  debug(JSON.stringify(result));

  document.write(btoa(JSON.stringify(result)));
};

((): void => {
  const params = new URLSearchParams(window.location.search);

  const state = params.get('resume');
  const sourceCode = params.get('begin');
  const value = params.get('value');

  try {
    if (state) {
      resume(state, value);
    } else if (sourceCode) {
      begin(sourceCode);
    }
  } catch (e) {
    document.write(JSON.stringify(e));
  }
})();
