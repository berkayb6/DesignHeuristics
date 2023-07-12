import React from 'react';
import {Row, Col} from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';
import { Container } from 'reactstrap';
import Footer from './FooterComponent';

function Impress (props){
    return(
        <>
            <Container fluid>
                <Row style={{width:'auto', display:'inline-block', textAlign:'justify'}}>
                    <img style={{ width: '15vw', height:'auto'}} src= {`${baseUrl}assets/BD-logoLanding.png`}/>
                    <p>
                        An Application by the Department of
                        <br/>Industrial Information Technology of TU Berlin
                    </p>
                </Row>
                <Row style={{alignItems:'center'}}>
                        <Row style={{textAlign:'center', width:'90%'}}>
                                <p>
                                    <h1 style={{lineHeight:'25pt', marginTop:'10vw'}}>    
                                        <strong>Impressum</strong>
                                    </h1>
                                </p>
                            </Row>
                            <Row style={{ width:'90%', marginTop:'10vw', marginBottom:'5vw'}}>
                                <p style={{display:"block", marginLeft:'5vw'}}>
                                    <h5 style={{textAlign:'justify',lineHeight:'25pt'}}>

                                        Das Webangebot der Technischen Universität Berlin besteht aus zahlreichen Angeboten verschiedener Einrichtungen. Die redaktionelle Verantwortlichkeit liegt bei den jeweiligen Stellen wie etwa Fakultäten, Institute, Zentraleinrichtungen, Verwaltungseinrichtungen etc. Falls Sie Fragen oder Anmerkungen zu einer Seite haben, wenden Sie sich bitte an die jeweils zuständige Einrichtung. 
                                        <br/><br/>Dieses Impressum gilt nur für Inhalte des Fachgebiets für Industrielle Informationstechnik der TU Berlin. 
                                        <br/><br/>Die Technische Universität Berlin ist eine Körperschaft öffentlichen Rechts gemäß §§ 1 und 2 des Berliner Hochschulgesetzes (BerlHG) und zugleich eine staatliche Einrichtung. Sie wird durch die Präsidentin gesetzlich vertreten. Der Name "Technische Universität Berlin" wird nicht ins Englische übersetzt. 
                                        <br/><br/>Rechtsaufsicht: Senatsverwaltung für Wissenschaft, Gesundheit, Pflege und Gleichstellung 
                                        <br/><br/>Umsatzsteueridentifikationsnummer: USt-Id-Nr.: DE 811 231 089
                                        <br/><br/><br/>Zentrale Adresse
                                        <br/><br/>Technische Universität Berlin
                                        <br/><br/>Prof. Dr. Geraldine Rauch (Präsidentin)
                                        <br/><br/>pressestelle@tu-berlin.de
                                        <br/>Adresse 	Straße des 17. Juni 135
                                        <br/>10623 Berlin
                                        <br/>www.tu.berlin
                                        <br/><br/><br/>Ansprechpartner*innen
                                        <br/><br/>Die Webseiten der TU Berlin sind dezentral organisiert und werden von den einzelnen Einrichtungen selbst gepflegt. Bei Fragen und Anregungen wenden Sie sich bitte direkt an die jeweils verantwortliche Stelle.
                                        <br/>Falls Sie Fragen zu der Anwendung Better Design haben, wenden Sie sich bitte an
                                        <strong><br/><br/>Gerald Kremer
                                        <br/>kremer@tu-berlin.de
                                        <br/>0049 30 314 2550</strong>
                                        <br/><br/><br/><h2><strong>Haftungsausschluss (Disclaimer)</strong></h2>
                                        <br/><br/><strong>Inhalt des Onlineangebotes</strong>
                                        <br/><br/>Die Inhalte dieser Website werden mit größtmöglicher Sorgfalt recherchiert und implementiert. Fehler im Bearbeitungsvorgang sind dennoch nicht auszuschließen. Hinweise und Korrekturen senden Sie bitte an Gerald Kremer (kremer@tu-berlin.de).
                                        <br/><br/>Der Herausgeber übernimmt keinerlei Gewähr für die Aktualität, Korrektheit, Vollständigkeit oder Qualität der bereitgestellten Informationen. Haftungsansprüche gegen den Herausgeber, welche sich auf Schäden materieller oder ideeller Art beziehen, die durch die Nutzung oder Nichtnutzung der dargebotenen Informationen bzw. durch die Nutzung fehlerhafter und unvollständiger Informationen verursacht wurden, sind grundsätzlich ausgeschlossen, sofern seitens des Herausgebers kein nachweislich vorsätzliches oder grob fahrlässiges Verschulden vorliegt.
                                        <br/><br/>Alle Angebote sind freibleibend und unverbindlich. Der Herausgeber behält es sich ausdrücklich vor, Teile der Seiten oder das gesamte Angebot ohne gesonderte Ankündigung zu verändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen.
                                        <br/><br/><strong>Verweise und Links</strong>
                                        <br/><br/>Bei direkten oder indirekten Verweisen auf fremde Webseiten ("Hyperlinks"), die außerhalb des Verantwortungsbereiches des Herausgebers liegen, würde eine Haftungsverpflichtung ausschließlich in dem Fall in Kraft treten, in dem der Herausgeber von den Inhalten Kenntnis hat und es ihm technisch möglich und zumutbar wäre, die Nutzung im Falle rechtswidriger Inhalte zu verhindern.
                                        <br/><br/>Der Herausgeber erklärt hiermit ausdrücklich, dass zum Zeitpunkt der Linksetzung keine illegalen Inhalte auf den zu verlinkenden Seiten erkennbar waren. Auf die aktuelle und zukünftige Gestaltung, die Inhalte oder die Urheberschaft der verlinkten/verknüpften Seiten hat der Herausgeber keinerlei Einfluss. Deshalb distanziert er sich hiermit ausdrücklich von allen Inhalten aller verlinkten /verknüpften Seiten, die nach der Linksetzung verändert wurden. Diese Feststellung gilt für alle innerhalb des eigenen Internetangebotes gesetzten Links und Verweise sowie für Fremdeinträge in vom Autor eingerichteten Gästebüchern, Diskussionsforen, Linkverzeichnissen, Mailinglisten und in allen anderen Formen von Datenbanken, auf deren Inhalt externe Schreibzugriffe möglich sind. Für illegale, fehlerhafte oder unvollständige Inhalte und insbesondere für Schäden, die aus der Nutzung oder Nichtnutzung solcherart dargebotener Informationen entstehen, haftet allein der Anbieter der Seite, auf welche verwiesen wurde, nicht derjenige, der über Links auf die jeweilige Veröffentlichung lediglich verweist.
                                        <br/><br/><strong>Urheber- und Kennzeichenrecht</strong>
                                        <br/><br/>Der Herausgeber ist bestrebt, in allen Publikationen die Urheberrechte der verwendeten Bilder, Grafiken, Ton- und Videodokumente sowie Texte zu beachten, von ihm selbst erstellte Bilder, Grafiken, Ton- und Videodokumente sowie Texte zu nutzen oder auf lizenzfreie Grafiken, Ton- und Videodokumente sowie Texte zurückzugreifen.
                                        <br/><br/>Alle innerhalb des Internetangebotes genannten und ggf. durch Dritte geschützten Marken- und Warenzeichen unterliegen uneingeschränkt den Bestimmungen des jeweils gültigen Kennzeichenrechts und den Besitzrechten der jeweiligen eingetragenen Eigentümer. Allein aufgrund der bloßen Nennung ist nicht der Schluss zu ziehen, dass Markenzeichen nicht durch Rechte Dritter geschützt sind!
                                        <br/><br/>Das Copyright für veröffentlichte, vom Herausgeber selbst erstellte Inhalte und Objekte bleibt allein beim Herausgeber der Seiten. Eine Vervielfältigung, Verarbeitung, Einspeicherung oder Verwendung solcher Grafiken, Ton- und Videodokumente sowie Texte in anderen elektronischen oder gedruckten Publikationen ist ohne ausdrückliche Zustimmung des Autors nicht gestattet. Unberührt davon bleibt das Kopieren und Herunterladen für den privaten, wissenschaftlichen und nicht kommerziellen Gebrauch. Wir erlauben ausdrücklich und begrüßen das Zitieren unserer Dokumente und Webseiten sowie das Setzen von Links auf unsere Website.
                                        <br/><br/><strong>Datenschutz</strong>
                                        <br/><br/>Sofern innerhalb des Internetangebotes die Möglichkeit zur Eingabe persönlicher oder geschäftlicher Daten (Emailadressen, Namen, Anschriften) besteht, so erfolgt die Preisgabe dieser Daten seitens des Nutzers auf ausdrücklich freiwilliger Basis. Die Inanspruchnahme und Bezahlung aller angebotenen Dienste ist - soweit technisch möglich und zumutbar - auch ohne Angabe solcher Daten bzw. unter Angabe anonymisierter Daten oder eines Pseudonyms gestattet. Die Nutzung der im Rahmen des Impressums oder vergleichbarer Angaben veröffentlichten Kontaktdaten wie Postanschriften, Telefon- und Faxnummern sowie Emailadressen durch Dritte zur Übersendung von nicht ausdrücklich angeforderten Informationen ist nicht gestattet. Rechtliche Schritte gegen die Versender von so genannten Spam-Mails bei Verstößen gegen dieses Verbot sind ausdrücklich vorbehalten.
                                        <br/><br/><strong>Rechtswirksamkeit dieses Haftungsausschlusses</strong>
                                        <br/><br/>Dieser Haftungsausschluss ist als Teil des Internetangebotes unter https://www.tu.berlin/ bzw. https://redaktion.tu.berlin/ zu betrachten, von dem aus auf diese Seite verwiesen wurde. Sofern Teile oder einzelne Formulierungen dieses Textes der geltenden Rechtslage nicht, nicht mehr oder nicht vollständig entsprechen sollten, bleiben die übrigen Teile des Dokumentes in ihrem Inhalt und ihrer Gültigkeit davon unberührt.
                                    </h5>
                                </p>
                            </Row>
                    </Row>
            </Container>
            <Footer/>
        </>
    )
}

export default Impress