import { useEffect, useState } from 'react';

export default function Tariff() {
    const [xmlContent, setXmlContent] = useState('');
    useEffect(() => {
        fetch('/Tariff.xml')
            .then((res) => res.text())
            .then((text) => setXmlContent(text))
            .catch((error) => console.error('Error fetching XML:', error));
    }, []);
    
    return (
        <div className='tariff-container'>
            <pre className="tariff-xml">
                {xmlContent}
            </pre>
        </div>

    )
}
//need to add the tariff data here, would be nice to include a date it was last changed possibly a change log. A tariff tester would be very useful but i dont know how complicated this is.
// add the style to css to keep it consistent with the rest of the app