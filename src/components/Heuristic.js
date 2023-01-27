import React, { Component } from 'react';

class Heuristic {
    constructor(map) {
        this.title= map.title;
        this.path= '/' + this.title.trim().replace(/\s+/g, '-').toLowerCase();
        this.heuristic= map;
    }
}
export default Heuristic