import React from 'react';
import {Row} from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';
import { Container } from 'reactstrap';
import Footer from './FooterComponent';

function Datenschutz (props){
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
                                        <strong>Datenschutzerklärung</strong>
                                    </h1>
                                </p>
                            </Row>
                            <Row style={{ width:'90%', marginTop:'10vw', marginBottom:'5vw'}}>
                                <p style={{display:"block", marginLeft:'5vw'}}>
                                    <h5 style={{textAlign:'justify',lineHeight:'25pt'}}>
                                        Vielen Dank für Ihr Interesse an Better Design, einer Web-Anwendung des Fachgebiets für Industrielle Informationstechnik der Technischen Universität Berlin (TU Berlin). Der Schutz der persönlichen Daten von Besuchern und Besucherinnen der Webseiten des Fachgebiets ist uns sehr wichtig. Deshalb möchten wir Sie hier über den Datenschutz dieses Webangebots unter www.better-design.org/datenschutz[K1] informieren.
                                        <br/><br/>Gegenstand des Datenschutzes
                                        <br/>Der Datenschutz befasst sich mit personenbezogenen Daten. Diese sind nach Artikel 4 Nr. 1 der Europäischen Datenschutzgrundverordnung (EU-DSGVO) alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person beziehen, also alle Informationen, die dazu genutzt werden können, Sie zu identifizieren. Hierunter fallen z.B. Angaben wie Name, Privat-Adresse, E-Mail-Adresse oder Telefonnummer, aber auch Nutzungsdaten wie Ihre IP-Adresse.
                                        <br/>Selbstverständlich beachtet die Technische Universität Berlin die gesetzlichen Bestimmungen zum Datenschutz und andere rechtliche Bestimmungen und Vorgaben.
                                        <br/><br/>Wir tun alles dafür, dass Sie uns bezüglich Ihrer persönlichen Daten vertrauen können. So erfolgt die Übertragung personenbezogener und sensibler Daten verschlüsselt. Zusätzlich sind unsere Webseiten durch technische Maßnahmen gegen Beschädigungen oder unberechtigten Zugriff geschützt.
                                        <br/><br/><br/>Allgemeiner Datenschutzhinweis
                                        <br/>1. Wenn Sie Webseiten der TU Berlin aufrufen oder Daten dieser Seiten herunterladen, werden Informationen hierüber in einer Logdatei mit folgendem Inhalt gespeichert: - die IP-Adresse Ihres Gerätes, - das Datum und die Uhrzeit des Seitenaufrufs, - die aufgerufene Seite bzw. der Name der abgerufenen Datei, - die übertragene Datenmenge, - der "User Agent-String" Ihres Webbrowsers, - die Webseite, von der aus Sie die aktuelle Seite oder Datei aufgerufen haben - und die Statusmeldung, ob der Zugriff bzw. Abruf erfolgreich war. Diese nicht anonymisierten Logdaten werden nach zwei Wochen automatisch gelöscht, nicht archiviert und ausschließlich zu nichtkommerziellen Zwecken genutzt. [K2] Sie werden nur im Bedarfsfall manuell eingesehen und zur Fehleranalyse, Optimierung oder Untersuchung von Missbrauchsfällen oder Performance-Engpässen benötigt. Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f EU-DSGVO dar. Ein Widerspruchsrecht nach Art. 21 EU-DSGVO ist nicht möglich aufgrund fehlender technischer Realisierbarkeit.
                                        <br/>2. Um Ihre übermittelten Daten bestmöglich zu schützen, nutzen wir für jegliche Übertragung von Daten SSL-[K3] Verschlüsselung. Sie erkennen derart verschlüsselte Verbindungen an dem Präfix “https://“ im Seitenlink in der Adresszeile bzw. durch das grüne/geschlossene Schlosssymbol Ihres Browsers. Unverschlüsselte Seite sind durch “http://“ oder ein offenes bzw. rotes Schlosssymbol gekennzeichnet. Sämtliche Daten, welche Sie an diese Website übermitteln – etwa bei Anfragen oder Logins – können dank SSL-Verschlüsselung nicht von Dritten gelesen werden.
                                        <br/>3. Zur Datenerhebung und -speicherung werden häufig zusätzlich Cookies eingesetzt. Cookies sind kleine Datenpakete, die aus Text bestehen und von Ihrem Webbrowser beim Aufruf einer Webseite gespeichert werden. Cookies werden von uns eingesetzt, um Ihnen eine optimale Nutzung der Webseiten zu ermöglichen. . Sie werden ausschließlich dort eingesetzt, wo sie technisch notwendig bzw. sinnvoller als andere Techniken sind (im Sinne von Art. 6 Abs. 1 lit. f EU-DSGVO): zur Erfassung Ihres Login-Status‘ und Ihres Einverständnisses zur Anzeige externer Inhalte (Opt-In) Die Nutzung der Webseiten ist dem zur Folge überwiegend ohne den Einsatz von Cookies möglich. Für Funktionen bzw. Seiten, die eine Anmeldung oder ein Passwort benötigen, sind Cookies jedoch technisch erforderlich. Wir verwenden temporäre und permamente Cookies. [K4] Temporäre Cookies (auch Session-Cookies genannt) werden mit dem Schließen Ihres Webbrowsers automatisch gelöscht. Dauerhafte Cookies haben dagegen eine festgelegte Lebensdauer. Sie können Ihren Webbrowser so einstellen, dass bereits abgelegte Cookies gelöscht werden.
                                        <br/><br/><br/>Übersicht unserer eingesetzten Cookies
                                        <br/><br/>be_lastLoginProvider
                                        <br/>wird verwendet, um Informationen über den letzten Login-Provider beim Einloggen in das TYPO3 Backend zu speichern
                                        <br/>redaktion.tu.berlin
                                        <br/>90 Tage
                                        <br/>be_typo_user
                                        <br/>wird verwendet, um eine Backend-Sitzung zu identifizieren, wenn sich ein/e Backend-Benutzer*in im TYPO3-Backend oder Frontend einloggt
                                        <br/>redaktion.tu.berlin
                                        <br/>SESSION
                                        <br/><br/><br/>Ansprechpartner*innen für allgemeine Datenschutzfragen
                                        <br/>Gerald Kremer
                                        <br/>Wissenschaftlicher Mitarbeiter
                                        <br/>kremer@tu-berlin.de
                                        <br/>+49 30 314 2550
                                        <br/><br/><br/>Umfang der Datenerhebung und -speicherung
                                        <br/>Unseren Umgang mit personenbezogenen Verkehrsdaten entnehmen Sie bitte dem „Allgemeinen Hinweis“ und dem Kapitel zu „Nutzungsdaten“.
                                        <br/>Für die Nutzung unserer Webseiten ist die aktive Mitteilung Ihrer personenbezogenen Daten nicht erforderlich - damit die TU Berlin ihren Dienstleistungsauftrag erfüllen kann, benötigen wir im Einzelfall jedoch personenbezogenen Daten, deren Verarbeitung im Sinne von Art. 6 Abs. 1 lit. a EU-DSGVO erfolgt. Dies gilt insbesondere für die Beantwortung individueller E-Mail-Anfragen oder die Bestellung spezieller Dienste.
                                        <br/>Erhebung und Speicherung von Nutzungsdaten
                                        <br/><br/><br/>Logdaten
                                        <br/>Zur Optimierung unserer Webseite speichern wir Daten wie die IP-Adresse Ihres Gerätes, die aufgerufene Seite, Datum und Uhrzeit des Seitenaufrufs, die Seite, von der Sie unsere Seite aufgerufen haben. Diese Daten werden zur Fehlerbehandlung und zum Erkennen von Missbrauchsversuchen vorgehalten, nach zwei Wochen automatisch gelöscht und nicht archiviert; eine dauerhafte Speicherung ist ausgeschlossen. Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f EU-DSGVO dar. Ein Widerspruchsrecht nach Art. 21 EU-DSGVO ist nicht möglich aufgrund fehlender technischer Realisierbarkeit.
                                        <br/>Matomo
                                        <br/><br/>Auf unseren Webseiten werden zusätzlich unter Einsatz der Webanalysedienst-Software Matomo (siehe www.matomo.org) auf Basis des berechtigten Interesses der TU Berlin an der statistischen Analyse des Nutzerverhaltens zu Optimierungs- und Marketingzwecken gemäß Art. 6 Abs. 1 lit. f EU-DSGVO Daten gesammelt und gespeichert. Wir verwenden eine eigene Matomo-Instanz auf Servern der TU Berlin, die nach den Empfehlungen des "Unabhängigen Landeszentrum für Datenschutz" (ULD) Schleswig Holstein eingerichtet wurde:
                                        <br/> *beim Aufruf der Seiten werden Ihre Zugriffsdaten sofort anonymisiert
                                        <br/> *Matomo verwendet für das Tracking keine Cookies, sondern arbeitet ausschließlich auf Basis der anonymisierten IP-Adresse Ihres Geräte und Webseitenaufrufe
                                        <br/> *gespeichert werden neben aufgerufenen Seiten und Dateien u.a. Daten zu verwendetem Betriebssystem, Browser, Browserplugins, Bildschirmauflösung, dem ungefähren Standort (z.B. "Berlin", jedoch keine konkrete Adresse) und Verweildauer.
                                        <br/>Haben Sie in Ihrem Browser die Option "Do Not Track" gesetzt, wird Matomo keine der Daten Ihres Webseitenbesuchs speichern bzw. verarbeiten. Haben Sie dagegen die "Do Not Track"-Option nicht gesetzt und sind mit der Speicherung und Auswertung Ihrer durch Matomo erfassten Daten nicht einverstanden, dann können Sie der Speicherung widersprechen. Hierzu stellen wir Ihnen nachfolgend einen speziellen Iframe zur Verfügung, der mit unserem Matomo-System verknüpft ist und Ihnen eine Opt-Out-Möglichkeit vom Tracking bietet. Nehmen Sie diese durch Deaktivierung der Checkbox in Anspruch, wird in Ihrem Browser ein sogenanntes Opt-Out-Cookie abgelegt, was zur Folge hat, dass unser Matomo-System keinerlei Sitzungsdaten erhebt. Bitte beachten Sie, dass die vollständige Löschung Ihrer Cookies zur Folge hat, dass auch das Opt-Out-Cookie gelöscht wird und ggf. von Ihnen erneut aktiviert werden muss.
                                        <br/><br/>YouTube
                                        <br/>Für die Darstellung von Videoinhalten nutzt unsere Website unter anderem ein Plugin zur Einbindung von YouTube-Videos. Anbieter des Videoportals ist die YouTube, LLC, 901 Cherry Ave., San Bruno, CA 94066, USA. Beim Aufruf einer Seite mit integriertem YouTube-Plugin wird nicht sofort eine Verbindung zu den Servern von YouTube hergestellt. Statt dessen wird ein lokales Bild ("Thumbnail") zur Ankündigung des Videos geladen und auf YouTube als Drittanbieter hingewiesen. Nutzer*innen müssen aktiv das YouTube-Video starten. Erst dann erfährt hierbei YouTube die IP-Adresse Ihres Endgerätes und die Seite mit YouTube-Video, die Sie gerade aufgerufen haben, selbst wenn Sie nicht beim Videoportal eingeloggt sind oder dort kein Konto besitzen.
                                        <br/>YouTube kann Ihr Surfverhalten direkt Ihrem persönlichen Profil zuzuordnen, sollten Sie in Ihrem YouTube Konto eingeloggt sein. Durch vorheriges Ausloggen haben Sie die Möglichkeit, dies zu unterbinden.
                                        <br/>Die Nutzung von YouTube erfolgt erst mit Ihrer Zustimmung durch Ihren aktiven Start des Videos im Sinne von Art. 6 Abs. 1 lit. a EU-DSGVO.
                                        <br/>Einzelheiten zum Umgang mit Nutzerdaten finden Sie in der Datenschutzerklärung von YouTube unter: https://www.google.de/intl/de/policies/privacy
                                        <br/>Ort der Speicherung und zweckgebundene Datenverwendung
                                        <br/>Wir erheben, verarbeiten und speichern Ihre personenbezogenen Daten ausschließlich intern (i.d.R. im Rechenzentrum der TU Berlin) nur für den Zweck, für den Sie sie uns mitgeteilt haben und beachten damit den Grundsatz der zweckgebundenen Datenverwendung. Es erfolgt ohne Ihre ausdrückliche Einwilligung keine Weitergabe Ihrer persönlichen Daten an Dritte, sofern dies nicht zur Erbringung der Dienstleistung oder zur Vertragsdurchführung notwendig ist. Auch die Übermittlung an auskunftsverlangende staatliche Institutionen und Behörden erfolgt nur im Rahmen der gesetzlichen Auskunftspflichten bzw. wenn wir durch eine gerichtliche Entscheidung zur Auskunft verpflichtet werden.
                                        <br/>Wir nehmen auch den Universitäts-internen Datenschutz sehr ernst. Unsere Mitarbeiter und Mitarbeiterinnen sowie die von uns beauftragten Dienstleistungsunternehmen sind von uns zur Verschwiegenheit und zur Einhaltung der datenschutzrechtlichen Bestimmungen verpflichtet.
                                        <br/><br/><br/>Auskunftsrecht
                                        <br/>Sie erhalten jederzeit ohne Angabe von Gründen kostenfrei Auskunft über Ihre bei uns gespeicherten Daten. Hierzu wenden Sie sich bitte an die im Impressum angegebene Kontaktadresse. Gerne stehen wir Ihnen für weitergehende Fragen zu unseren Datenschutzhinweisen zur Verfügung.
                                        <br/>Darüber hinaus haben Sie das Recht auf Berichtigung, Löschung, Einschränkung und Übertragung Ihrer Daten.
                                        <br/>Sie haben auch das Recht jederzeit gegen die Verarbeitung der Sie betreffenden personenbezogenen Daten, die aufgrund von Art. 6 Abs. 1 Buchstabe e und f EU-DSGVO erfolgt, Widerspruch einzulegen. Die fachverantwortliche Stelle darf danach die Sie betreffenden personenbezogenen Daten nicht mehr verarbeiten, es sei denn, diese kann zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihren Interessen, Rechte und Freiheiten überwiegen, oder die Verarbeitung der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen dient.
                                        <br/><br/><br/>Beschwerderecht
                                        <br/>Sollten Sie Anhaltspunkte dafür erkennen, dass wir mit Ihren Daten nicht datenschutzgerecht umgehen, können Sie sich jederzeit an das Team Datenschutz der Technischen Universität Berlin oder an die Aufsichtsbehörde wenden.
                                        <br/>Natürlich steht Ihnen auch das Recht zu, sich an die Aufsichtsbehörde zu wenden:
                                        <br/>Berliner Beauftragte für Datenschutz und Informationsfreiheit Friedrichstr. 219 / Besuchereingang über Puttkamerstr. 16 -18 10969 Berlin Tel.: +49 30 13889-0 Fax: +49 30 2155050 E-Mail: mailbox@datenschutz-berlin.de
                                        <br/><br/><br/>Abschließende Hinweise
                                        <br/>Beachten Sie, dass sich Datenschutzbestimmungen und Handhabungen zum Datenschutz laufend ändern können, so dass es erforderlich ist, sich über Veränderungen der gesetzlichen Bestimmungen und der Praxis von Unternehmen fortlaufend zu informieren.
                                        <br/><br/>Diese Datenschutzerklärung gilt nur für Inhalte unter *.tu.berlin und umfasst nicht die verlinkten Webseiten nachgelagerter oder externer Webserver.
                                        <br/>[K1]Bitte diese URL nutzen für die Datenschutzerklärung
                                        <br/>[K2]Prüfen
                                        <br/>[K3]Immer noch nicht mit Lucky abgeklärt
                                        <br/>[K4]Lasse ich drin, falls wir noch Social Media Einbindung haben
                                    </h5>
                                </p>
                            </Row>
                    </Row>
            </Container>
            <Footer/>
        </>
    )
}

export default Datenschutz