export const HEURISTICS =
    [
        {
        id: 0,
        designfor: 'sustainability',
        level: 'parts',
        industry: 'all',
        rating: '4,8',
        name:'Minimizing',
        title:'Minimise number of materials.'                
        },
        {
        id: 1,
        designfor: 'sustainability',
        level: 'parts',
        industry: 'all',
        rating: '4,8',
        name:'Make subassemblies',
        title:'Make subassemblies and inseparable connected parts from the same or compatible material.'
        },
        {
        id: 2,
        designfor: 'sustainability',
        level: 'parts',
        industry: 'all',
        rating: '4,8',
        name:'Avoiding',
        title:'Avoid the mixing of materials in assemblies.'
        },
        {
        id: 3,
        designfor: 'sustainability',
        level: 'parts',
        industry: 'all',
        rating: '4,8',
        name:'Marking',
        title:'Mark all plastic and similar parts for ease of identification.'
        },
        {
        id: 4,
        designfor: 'ergonomics',
        level: 'parts',
        industry: 'all',
        rating: '4,8',
        name:'Minimizing',
        title:'Minimise number of materials.',
        positiveInfluence: ['Recyclability', 'Sustainability', 'Disassemblability', 'Reusability', 'Circularity'],
        negativeInfluence: ['Cost efficiency', 'Assemblability'],
        applicableIndustry: ['Automotive', 'Furniture', 'Shipping', 'Aerospace', 'Home appliances', 'Electronics'],
        description: 'Häufig werden Plastikteile und Komponenten ohne eine ausreichende Kennzeichnung verbaut. Durch eine entsprechende Markierung, die anzeigt, um welche Art von Plastik es sich handelt, kann die Recyclingfähigkeit des Produkts stark gesteigert werden. Achten Sie bei der Beschriftung des Teils oder der Komponente darauf, dass die Beschriftung schnell und intuitiv erkennbar ist, wenn das Produkt geöffnet wird. Die Beschrifung kann dabei entweder im Gussverfahren der Teils im Design direkt eingeplant werden. Alternativ kann das Einzelteil/die Komponente auch nachträglich graviert oder mit einem Aufkleber versehen werden. Im Idealfall befinden sich darauf auch ein Code für weiterführende Informationen.',
        graphics: ['assets/id4_correct_image.png', 'assets/id4_wrong_image.png'],
        sources: ['VDI Gesellschaft Materials Engineering (2020): VDI-Statusreport Kunststoffe und deren Verwertung. Düsseldorf.']
        },
        {
        id: 5,
        designfor: 'ergonomics',
        level: 'parts',
        industry: 'all',
        rating: '4,8',
        name:'Make subassemblies',
        title:'Make subassemblies and inseparable connected parts from the same or compatible material.'
        },
        {
        id: 6,
        designfor: 'ergonomics',
        level: 'parts',
        industry: 'all',
        rating: '4,8',
        name:'Avoiding',
        title:'Avoid the mixing of materials in assemblies.'                 
        },
        {
        id: 7,
        designfor: 'ergonomics',
        level: 'parts',
        industry: 'all',
        rating: '4,8',
        name:'Marking',
        title:'Mark all plastic and similar parts for ease of identification.'
        }
    ]

    