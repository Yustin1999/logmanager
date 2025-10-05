import { useEffect, useState, useRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
export default function Tariff() {
    const codeRef = useRef();
    const [xmlContent, setXmlContent] = useState('');
    useEffect(() => {
        fetch('/Tariff.xml')
            .then(res => res.text())
            .then(setXmlContent)
            .catch((error) => console.error('Error fetching XML:', error));
    }, []);

    useEffect(() => {
        if (codeRef.current) {
            delete codeRef.current.dataset.highlighted;
            hljs.highlightElement(codeRef.current);
        }
    }, [xmlContent]);

    return (
        <div className='tariff-container'>
            <pre className="tariff-xml">
                <code className="language-xml" ref={codeRef}>{xmlContent}</code>
            </pre>
        </div>

    )
}
//need to add the tariff data here, would be nice to include a date it was last changed possibly a change log. A tariff tester would be very useful but i dont know how complicated this is.
// add the style to css to keep it consistent with the rest of the app