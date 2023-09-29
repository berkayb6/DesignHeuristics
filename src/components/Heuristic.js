import React, { Component } from 'react';

/** The file is to create pages for each heuristic */
class Heuristic {
    constructor(map) {
        this.title= map.title;
        this.path= '/' + map.shortId + '/' + this.title.trim().replace(/\s+/g, '-').toLowerCase();
        this.heuristic= map;
    }
}
export default Heuristic