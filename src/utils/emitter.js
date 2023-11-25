import EventEmitter from 'events' ;

const _emitter = new EventEmitter();
_emitter.setMaxListeners(0); //ulimit listener

export const emitter = _emitter