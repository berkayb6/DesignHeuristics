import React, {Component, useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Button } from 'reactstrap';
import {read, utils, writeFile} from 'xlsx';
//f = file
function DataBase(props){
    const [heuristics, setHeuristics] = useState([]);
    const [data, setData] = useState([]);
    const [pEffects, setPEffects] = useState([]);
    const [effects, setEffects] = useState([]);
    const handleImport = ($event) => {
        const files = $event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;
                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                    
                    setData(rows);
                }
            }
            reader.readAsArrayBuffer(file);
        }

    }
 
    var allPosEffectsAccordingToHeuristic=[];
    var allNegEffectsAccordingToHeuristic=[];
    var technicalProperty = ["efficiency", "noise level", "complexity", "internal variety", "robustness", "temperature", "friction", "volume", "weight", "losses", "others"];
    var lifeCyclePhase= ["minimum risk", "cost", "standards" , "assembly", "inspection", "logistics", "low quantity production", "supply chain", "modularity", "user friendliness", "aesthetics", "serviceability", "maintability", "repair", "reuse", "recyclability", "disassembly", "remanufacturing", "sustainability", "manufacturability", "ergonomics", "ease of design changes", "amount of produced goals", "economies of scale", "economies of scope", "product usage intensity", "product lifetime", "wear", "customer value", "other"];

    for (let i=0; i<data.length;i++){
        var allPosEffects= [];
        var allNegEffects= [];
        let newPosEffect, newNegEffect;
        for (let k=0; k<data[i].positiveEffects.split(',').map(item => item.trim()).length; k++){
            const even = (element) => element === data[i].positiveEffects.split(',').map(item => item.trim())[k];
            newPosEffect= {
                effectCategory: technicalProperty.some(even) ? "Technical Property": (lifeCyclePhase.some(even)? "Life Cycle Phase Property": "Life Cycle Property") ,
                effectCategorySpecification:data[i].positiveEffects.split(',').map(item => item.trim())[k]
            }
            allPosEffects.push(newPosEffect)
        }
        
        allPosEffectsAccordingToHeuristic.push(allPosEffects)
        if (data[i].negativeEffects){

            for (let l=0; l<data[i].negativeEffects.split(',').map(item => item.trim()).length; l++){
                const even = (element) => element === data[i].positiveEffects.split(',').map(item => item.trim())[l];
                newNegEffect= {
                    effectCategory: technicalProperty.some(even) ? "Technical Property": (lifeCyclePhase.some(even)? "Life Cycle Phase Property": "Life Cycle Property") ,
                    effectCategorySpecification:data[i].negativeEffects.split(',').map(item => item.trim())[l]
                }
                allNegEffects.push(newNegEffect)
            }
            allNegEffectsAccordingToHeuristic.push(allNegEffects)

        }
    }
    var heuristicsSet=[];
    const negId= [24, 29,30,36,58,131,215,217,218,223,224,225,226,257];
    let counter=0;
    for(let i=0; i<data.length;i++){
        let newHeuristic;
        const even = (element) => element  === data[i].shortId
        if (negId.some(even)){
            newHeuristic= {
                shortId: data[i].shortId,
                title: data[i].title,
                orderArtefact: data[i].orderArtefact,
                embodimentArtefact: data[i].embodimentArtefact,
                embodimentAtrribute: data[i].embodimentAtrribute,
                orderAttribute: data[i].orderAttribute,
                adressedSystemLevel: data[i].adressedSystemLevel,
                artefactCategorization: data[i].artefactCategorization,
                orderCategory: data[i].orderCategory,
                orderCategorySpecification: data[i].orderCategorySpecification,
                industry: data[i].industry.split(','),
                positiveEffects: allPosEffectsAccordingToHeuristic[i],
                negativeEffects: allNegEffectsAccordingToHeuristic[counter],
                source: data[i].source,
                description:data[i].description===void 0 ? "" : data[i].description
            }
            counter=counter+1;
        }
        else{
            newHeuristic= {
                shortId: data[i].shortId,
                title: data[i].title,
                orderArtefact: data[i].orderArtefact,
                embodimentArtefact: data[i].embodimentArtefact,
                embodimentAtrribute: data[i].embodimentAtrribute,
                orderAttribute: data[i].orderAttribute,
                adressedSystemLevel: data[i].adressedSystemLevel,
                artefactCategorization: data[i].artefactCategorization,
                orderCategory: data[i].orderCategory,
                orderCategorySpecification: data[i].orderCategorySpecification,
                industry: data[i].industry.split(','),
                positiveEffects: allPosEffectsAccordingToHeuristic[i],
                negativeEffects: [],
                source: data[i].source,
                description: data[i].description===void 0 ? "" : data[i].description
            }
        }
        //heuristicsSet.push(newHeuristic)
        var rating= 4;
        // need to change the ActionCreator and MainComponent so that they contain also shortId, and also the server side
        var shortId= newHeuristic.shortId;
        var title= newHeuristic.title;
        var orderArtefact= newHeuristic.orderArtefact;
        var embodimentArtefact= newHeuristic.embodimentArtefact;
        var embodimentAtrribute= newHeuristic.embodimentAtrribute;
        var orderAttribute= newHeuristic.orderAttribute;
        var adressedSystemLevel= newHeuristic.adressedSystemLevel;
        var artefactCategorization= newHeuristic.artefactCategorization;
        var orderCategory= newHeuristic.orderCategory;
        var orderCategorySpecification= newHeuristic.orderCategorySpecification;
        var positiveEffects= newHeuristic.positiveEffects;
        var negativeEffects= newHeuristic.negativeEffects;
        var industry= newHeuristic.industry;
        var description= newHeuristic.description;
        var sources= newHeuristic.source;
        var image= [];

        props.postHeuristic(
            shortId,
            title,
            orderArtefact,
            embodimentArtefact,
            embodimentAtrribute,
            orderAttribute,
            adressedSystemLevel, 
            artefactCategorization, 
            positiveEffects, 
            negativeEffects, 
            orderCategory, 
            orderCategorySpecification, 
            industry, 
            rating, 
            description, 
            image, 
            sources
        )
    }
        
    const handleExport = () => {
        const headings = [[
            'OrderArtefact',
            'embodimentArtefact',
            'EmbodimentAtrribute',
            'OrderAttribute',
            'adressedSystemLevel',
            'artefactCategorization',
            'orderCategory',
            'orderCategorySpecification',
            'effectCategory',
            'positiveEffects',
            'negativeEffects',
            'industry',
            'Graphic positive',
            'Graphic negative',
            'Graphic other',
            'rating',
            'comments',
            'description',
            'source',
            'shortId'
        ]];
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, heuristics, { origin: 'A2', skipHeader: true });
        utils.book_append_sheet(wb, ws, 'Report');
        writeFile(wb, 'heuristic Report.xlsx');
    }
    
    return(
        <>
            <div className="row mb-2 mt-5">
                <div className="col-sm-6 offset-3">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="input-group">
                                <div className="custom-file">
                                    <input type="file" name="file" className="custom-file-input" id="inputGroupFile" required onChange={handleImport}
                                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
                                    <label className="custom-file-label" htmlFor="inputGroupFile">Choose file</label>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-md-6">
                            <button onClick={handleExport} className="btn btn-primary float-right">
                            Export <i className="fa fa-download"></i>
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6 offset-3">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">OrderArtefact</th>
                                <th scope="col">embodimentArtefact</th>
                                <th scope="col">EmbodimentAtrribute</th>
                                <th scope="col">OrderAttribute</th>
                                <th scope="col">adressedSystemLevel</th>
                                <th scope="col">artefactCategorization</th>
                                <th scope="col">orderCategory</th>
                                <th scope="col">orderCategorySpecification</th>
                                <th scope="col">effectCategory</th>
                                <th scope="col">positiveEffects</th>
                                <th scope="col">negativeEffects</th>
                                <th scope="col">industry</th>
                                <th scope="col">Graphic positive</th>
                                <th scope="col">Graphic negative</th>
                                <th scope="col">Graphic other</th>
                                <th scope="col">rating</th>
                                <th scope="col">comments</th>
                                <th scope="col">description</th>
                                <th scope="col">source</th>
                                <th scope="col">shortId</th>
                                
                            </tr>
                        </thead>
                        <tbody> 
                                {
                                    heuristics.length
                                    ?
                                    heuristics.map((heuristic, index) => (
                                        <tr key={index}>
                                            {/* {console.log("heuristic: ", heuristic)} */}
                                            <th scope="row">{ index + 1 }</th>
                                            <td>{ heuristic.OrderArtefact }</td>
                                            <td>{ heuristic.Category }</td>
                                            <td>{ heuristic.Director }</td>
                                            <td><span className="badge bg-warning text-dark">{ heuristic.Rating }</span></td>
                                        </tr> 
                                    ))
                                    :
                                    <tr>
                                        <td colSpan="5" className="text-center">No heuristics Found.</td>
                                    </tr> 
                                }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
export default DataBase;