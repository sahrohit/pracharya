/* eslint-disable no-console */

import { db } from ".";
import { chapters, courses, coursesToChapters, subChapters } from "./schema";

const runSeed = async () => {
	console.log("⏳ Seeding database...");

	const start = Date.now();

	await db.insert(courses).values([
		{
			id: "computer-engineering",
			name: "Computer Engineering",
		},
		{
			id: "mechanical-engineering",
			name: "Mechanical Engineering",
		},
	]);

	await db.insert(chapters).values([
		{
			id: "basic-electrical-and-electronics-engineering",
			name: "Basic Electrical and Electronics Engineering",
		},
		{
			id: "digital-logic-and-microprocessor",
			name: "Digital Logic and Microprocessor",
		},
		{
			id: "programming-language-and-its-applications",
			name: "Programming Language and Its Applications",
		},
		{
			id: "computer-organization-and-embedded-system",
			name: "Computer Organization and Embedded System",
		},
		{
			id: "computer-network-and-network-security-system",
			name: "Computer Network and Network Security System",
		},
		{
			id: "theory-of-computation-and-computer-graphics",
			name: "Theory of Computation and Computer Graphics",
		},
		{
			id: "data-structures-and-algorithm-database-system-and-operating-system",
			name: "Data Structures and Algorithm Database System and Operating System",
		},
		{
			id: "software-engineering-and-object-oriented-analysis-and-design",
			name: "Software Engineering and Object Oriented Analysis and Design",
		},
		{
			id: "artificial-intelligence-and-neural-networks",
			name: "Artificial Intelligence and Neural Networks",
		},
		{
			id: "project-planning-design-and-implementation",
			name: "Project Planning, Design and Implementation",
		},
	]);

	await db.insert(coursesToChapters).values([
		{
			chapterId: "basic-electrical-and-electronics-engineering",
			courseId: "computer-engineering",
		},
		{
			chapterId: "digital-logic-and-microprocessor",
			courseId: "computer-engineering",
		},
		{
			chapterId: "programming-language-and-its-applications",
			courseId: "computer-engineering",
		},
		{
			chapterId: "computer-organization-and-embedded-system",
			courseId: "computer-engineering",
		},
		{
			chapterId: "computer-network-and-network-security-system",
			courseId: "computer-engineering",
		},
		{
			chapterId: "theory-of-computation-and-computer-graphics",
			courseId: "computer-engineering",
		},
		{
			chapterId:
				"data-structures-and-algorithm-database-system-and-operating-system",
			courseId: "computer-engineering",
		},
		{
			chapterId: "software-engineering-and-object-oriented-analysis-and-design",
			courseId: "computer-engineering",
		},
		{
			chapterId: "artificial-intelligence-and-neural-networks",
			courseId: "computer-engineering",
		},
		{
			chapterId: "project-planning-design-and-implementation",
			courseId: "computer-engineering",
		},
	]);

	await db.insert(subChapters).values([
		{
			id: "basic-concept",
			name: "Basic concept",
			content:
				"Ohm\u00b4s law, electric voltage current, power and energy, conducting and insulating materials. Series and parallel electric circuits, start-delta and delta-star conversion, Kirchhoff\u2019s law, linear and non-linear circuit, bilateral and unilateral circuits, active and passive circuits.",
			chapterId: "basic-electrical-and-electronics-engineering",
		},
		{
			id: "network-theorems",
			name: "Network theorems",
			content:
				"concept of superposition theorem, Thevenin`s theorem, Norton`s theorem, maximum power transfer theorem. R-L, R-C, R-L-C circuits, resonance in AC series and parallel circuit, active and reactive power.",
			chapterId: "basic-electrical-and-electronics-engineering",
		},
		{
			id: "alternating-current-fundamentals",
			name: "Alternating current fundamentals",
			content:
				"Principle of generation of alternating voltages and currents and their equations and waveforms, average, peak and rms values. Three phase system.",
			chapterId: "basic-electrical-and-electronics-engineering",
		},
		{
			id: "semiconductor-devices",
			name: "Semiconductor devices",
			content:
				"Semiconductor diode and its characteristics, BJT Configuration and biasing, small and large signal model, working principle and application of MOSFET and CMOS.",
			chapterId: "basic-electrical-and-electronics-engineering",
		},
		{
			id: "signal-generator",
			name: "Signal generator",
			content:
				"Basic Principles of Oscillator, RC, LC and Crystal Oscillators Circuits, Waveform generators.",
			chapterId: "basic-electrical-and-electronics-engineering",
		},
		{
			id: "amplifiers",
			name: "Amplifiers",
			content:
				"Classification of Output Stages, Class A Output Stage, Class B Output Stage, Class AB Output Stage, Biasing the Class AB Stage, Power BJTs, Transformer-Coupled Push-Pull Stages, and Tuned Amplifiers, op-amps.",
			chapterId: "basic-electrical-and-electronics-engineering",
		},
		{
			id: "digital-logic",
			name: "Digital logic",
			content:
				"Number Systems, Logic Levels, Logic Gates, Boolean algebra, Sum-of-Products Method, Product-of-Sums Method, Truth Table to Karnaugh Map.",
			chapterId: "digital-logic-and-microprocessor",
		},
		{
			id: "combinational-and-arithmetic-circuits",
			name: "Combinational and arithmetic circuits",
			content:
				"Multiplexetures, Demultiplexetures, Decoder, Encoder, Binary Addition, Binary Subtraction, operation on Unsigned and Signed Binary Numbers.",
			chapterId: "digital-logic-and-microprocessor",
		},
		{
			id: "sequential-logic-circuit",
			name: "Sequential logic circuit",
			content:
				"RS Flip-Flops, Gated Flip-Flops, Edge Triggered Flip-Flops, Mater- Slave Flip-Flops. Types of Registers, Applications of Shift Registers, Asynchronous Counters, Synchronous Counters.",
			chapterId: "digital-logic-and-microprocessor",
		},
		{
			id: "microprocessor",
			name: "Microprocessor",
			content:
				"Internal Architecture and Features of microprocessor, Assembly Language Programming.",
			chapterId: "digital-logic-and-microprocessor",
		},
		{
			id: "microprocessor-system",
			name: "Microprocessor system",
			content:
				"Memory Device Classification and Hierarchy, Interfacing I/O and Memory Parallel Interface. Introduction to Programmable Peripheral Interface (PPI), Serial Interface, Synchronous and Asynchronous Transmission, Serial Interface Standards. Introduction to Direct Memory Access (DMA) and DMA Controllers.",
			chapterId: "digital-logic-and-microprocessor",
		},
		{
			id: "interrupt-operations",
			name: "Interrupt operations",
			content:
				"Interrupt, Interrupt Service Routine, and Interrupt Processing.",
			chapterId: "digital-logic-and-microprocessor",
		},
		{
			id: "introduction-to-c-programming",
			name: "Introduction to C programming",
			content:
				"C Tokens, Operators, Formatted/Unformatted Input/output, Control Statements, Looping, User-defined functions, Recursive functions, Array (1-D, 2-D, Multi dimensional), and String manipulations.",
			chapterId: "programming-language-and-its-applications",
		},
		{
			id: "pointers-structure-and-data-files-in-c-programming",
			name: "Pointers, structure and data files in C programming",
			content:
				"Pointer Arithmetic, Pointer and array, passing pointer to function, Structure vs Union, array of structure, passing structure to function, structure and pointer, Input/output operations on files, and Sequential and Random Access to File.",
			chapterId: "programming-language-and-its-applications",
		},
		{
			id: "cpp-language-constructs-with-objects-and-classes",
			name: "C++ language constructs with objects and classes",
			content:
				"Namespace, Function Overloading, Inline functions, Default Argument, Pass/Return by reference, introduction to Class and object, Access Specifiers, Objects and the Member Access, Defining Member Function, Constructor and its type, and Destructor, Dynamic memory allocation for objects and object array, this Pointer, static Data Member and static Function, Constant Member Functions and Constant Objects, Friend Function and Friend Classes.",
			chapterId: "programming-language-and-its-applications",
		},
		{
			id: "features-of-objectoriented-programming",
			name: "Features of object-oriented programming",
			content:
				"Operator overloading (unary, binary), data conversion, Inheritance (single, multiple, multilevel, hybrid, multipath), constructor/destructor in single/multilevel inheritances.",
			chapterId: "programming-language-and-its-applications",
		},
		{
			id: "pure-virtual-function-and-file-handling",
			name: "Pure virtual function and file handling",
			content:
				"Virtual function, dynamic binding, defining opening and closing a file, Input / Output operations on files, Error handling during input/output operations, Stream Class Hierarchy for Console Input /Output, Unformatted Input /Output Formatted Input /Output with ios Member functions and Flags, Formatting with Manipulators.",
			chapterId: "programming-language-and-its-applications",
		},
		{
			id: "generic-programming-and-exception-handling",
			name: "Generic programming and exception handling",
			content:
				"Function Template, Overloading Function Template, Class Template, Function Definition of Class Template, Standard Template Library (Containers, Algorithms, Iterators), Exception Handling Constructs (try, catch, throw), Multiple Exception Handling, Rethrowing Exception, Catching All Exceptions, Exception with Arguments, Exceptions Specification for Function, Handling Uncaught and Unexpected Exceptions.",
			chapterId: "programming-language-and-its-applications",
		},
		{
			id: "control-and-central-processing-units",
			name: "Control and central processing units",
			content:
				"Control Memory, addressing sequencing, Computer configuration, Microinstruction Format, Design of control unit, CPU Structure and Function, Arithmetic and logic Unit, Instruction formats, addressing modes, Data transfer and manipulation, RISC and CISC Pipelining parallel processing.",
			chapterId: "computer-organization-and-embedded-system",
		},
		{
			id: "computer-arithmetic-and-memory-system",
			name: "Computer arithmetic and memory system",
			content:
				"Arithmetic and Logical operation, The Memory Hierarchy, Internal and External memory, Cache memory principles, Elements of Cache design - Cache size, Mapping function, Replacement algorithm, write policy, Number of caches, Memory Write Ability and Storage Permanence, Composing Memory.",
			chapterId: "computer-organization-and-embedded-system",
		},
		{
			id: "inputoutput-organization-and-multiprocessor",
			name: "Input-Output organization and multiprocessor",
			content:
				"Peripheral devices, I/O modules Input-output interface, Modes of transfer Direct Memory access, Characteristics of multiprocessors, Interconnection Structure, Inter-processor Communication and synchronization.",
			chapterId: "computer-organization-and-embedded-system",
		},
		{
			id: "hardwaresoftware-design-issues-on-embedded-system",
			name: "Hardware-Software design issues on embedded system",
			content:
				"Embedded Systems overview, Classification of Embedded Systems. Custom Single-Purpose Processor Design, Optimizing Custom Single-Purpose Processors, Basic Architecture, Operation and Programmer\u2019s View, Development Environment. Application-Specific Instruction-Set Processors.",
			chapterId: "computer-organization-and-embedded-system",
		},
		{
			id: "realtime-operating-and-control-system",
			name: "Real-Time operating and control system",
			content:
				"Operating System Basics, Task, Process, and Threads, Multiprocessing and Multitasking, Task Scheduling, Task Synchronization, Device Drivers, Open-loop and Close-Loop control System overview, Control.",
			chapterId: "computer-organization-and-embedded-system",
		},
		{
			id: "hardware-descripts-language-and-ic-technology",
			name: "Hardware descripts language and IC technology",
			content:
				"VHDL Overview, Overflow and data representation using VHDL. Design of combinational and sequential logic using VHDL. Pipelining using VHDL.",
			chapterId: "computer-organization-and-embedded-system",
		},
		{
			id: "introduction-to-computer-networks-and-physical-layer",
			name: "Introduction to computer networks and physical layer",
			content:
				"Networking model, Protocols and Standards, OSI model and TCP/IP model, Networking Devices (Hubs, Bridges, Switches, and Routers) and Transmission media.",
			chapterId: "computer-network-and-network-security-system",
		},
		{
			id: "data-link-layer",
			name: "Data link layer",
			content:
				"Services, Error Detection and Corrections, Flow Control, Data Link Protocol, Multiple access protocols, LAN addressing and ARP (Address Resolution Protocol), Ethernet, IEEE 802.3(Ethernet), 802.4(Token Bus), 802.5(Token Ring), CSMA/CD, Wireless LANs, PPP (Point to Point Protocol), Wide area protocols.",
			chapterId: "computer-network-and-network-security-system",
		},
		{
			id: "network-layer",
			name: "Network layer",
			content:
				"Addressing (Internet address, classful address), Subnetting, Routing Protocols (RIP, OSPF, BGP, Unicast and multicast routing protocols), Routing algorithms (shortest path algorithm, flooding, distance vector routing, link state routing) Routing Protocols (ARP, RARP, IP, ICMP), and IPv6 (Packet formats, Extension headers, Transition from IPv4 to IPv6, and Multicasting).",
			chapterId: "computer-network-and-network-security-system",
		},
		{
			id: "transport-layer",
			name: "Transport layer",
			content:
				"The transport service, Transport protocols, Port and Socket, Connection establishment & Connection release, Flow control & buffering, Multiplexing & de-multiplexing, Congestion control algorithm",
			chapterId: "computer-network-and-network-security-system",
		},
		{
			id: "application-layer",
			name: "Application layer",
			content:
				"Web (HTTP & HTTPS), File Transfer (FTP, PuTTY, Win SCP), Electronic Mail, DNS, P2P Applications, Socket Programming, Application server concept, and Concept of traffic analyzer (MRTG, PRTG, SNMP, Packet tracer, Wireshark).",
			chapterId: "computer-network-and-network-security-system",
		},
		{
			id: "network-security",
			name: "Network security",
			content:
				"Types of Computer Security, Types of Security Attacks, Principles of cryptography, RSA Algorithm, Digital Signatures, securing e-mail (PGP), Securing TCP connections (SSL), Network layer security (IPsec, VPN), Securing wireless LANs (WEP), Firewalls.",
			chapterId: "computer-network-and-network-security-system",
		},
		{
			id: "introduction-to-finite-automata",
			name: "Introduction to finite automata",
			content:
				"Introduction to Finite Automata and Finite State Machine, Equivalence of DFA and NDFA, Minimization of Finite State Machines, Regular Expressions, Equivalence of Regular Expression and Finite Automata, Pumping lemma for regular language.",
			chapterId: "theory-of-computation-and-computer-graphics",
		},
		{
			id: "introduction-to-context-free-language",
			name: "Introduction to context free language",
			content:
				"Introduction to Context Free Grammar (CFG), Derivative trees (Bottom-up and Top-down approach, Leftmost and Rightmost, Language of a grammar), Parse tree and its construction, Ambiguous grammar, Chomsky Normal Form (CNF), Greibach Normal Form (GNF), Backus-Naur Form (BNF), Push down automata, Equivalence of context free language and PDA, Pumping lemma for context free language, and Properties of context free Language.",
			chapterId: "theory-of-computation-and-computer-graphics",
		},
		{
			id: "turing-machine",
			name: "Turing machine",
			content:
				"Introduction to Turing Machines (TM), Notations of Turing Machine, Acceptance of a string by a Turing Machines, Turing Machine as a Language Recognizer, Turing Machine as a Computing Function, Turing Machine as a enumerator of stings of a language, Turing Machine with Multiple Tracks, Turing Machine with Multiple Tapes, Non-Deterministic Turing Machines, Curch Turing Thesis, Universal Turing Machine for encoding of Turing Machine, Computational Complexity, Time and Space complexity of A Turing Machine, Intractability, Reducibility.",
			chapterId: "theory-of-computation-and-computer-graphics",
		},
		{
			id: "introduction-of-computer-graphics",
			name: "Introduction of computer graphics",
			content:
				"Overview of Computer Graphics, Graphics Hardware (Display Technology, Architecture of Raster-Scan Displays, Vector Displays, Display Processors, output device and Input Devices), Graphics Software and Software standards.",
			chapterId: "theory-of-computation-and-computer-graphics",
		},
		{
			id: "twodimensional-transformation",
			name: "Two-dimensional transformation",
			content:
				"Two-dimensional translation, rotation, scaling, reflection, shear transformation, 2D composite transformation, 2D viewing pipeline, world to screen viewing transformation and clipping (Cohen Sutherland line clipping, Liang-Barsky Line Clipping)",
			chapterId: "theory-of-computation-and-computer-graphics",
		},
		{
			id: "threedimensional-transformation",
			name: "Three-dimensional transformation",
			content:
				"Three-dimensional translation, rotation, scaling, reflection, shear transformation, 3D composite transformation, 3D viewing pipeline, projection concepts (Orthographic, parallel, perspective projection)",
			chapterId: "theory-of-computation-and-computer-graphics",
		},
		{
			id: "introduction-to-data-structure-list-linked-lists-and-trees",
			name: "Introduction to data structure, list, linked lists and trees",
			content:
				"data types, data structures and abstract data types; time and space analysis of algorithms (Big oh, omega and theta notations), Linear data structure (Stack and queue implementation); Stack application: infix to postfix conversion, and evaluation of postfix expression, Array implementation of lists; Stack and Queues as list; and Static list structure, Static and dynamic list structure; Dynamic implementation of linked list; Types of Linked list: Singly Linked list, Doubly Linked list, and Circular Linked list; Basic operations on Linked list: creation of linked list, insertion of node in different positions, and deletion of nodes from different positions; Doubly linked lists and its applications, Concept of Tree, Operation in Binary tree, Tree search, insertion/deletions in Binary Tree, Tree traversals (pre-order, post-order and in-order), Height, level and depth of a tree, AVL balanced trees.",
			chapterId:
				"data-structures-and-algorithm-database-system-and-operating-system",
		},
		{
			id: "sorting-searching-and-graphs",
			name: "Sorting, searching, and graphs",
			content:
				"types of sorting: internal and external; Insertion and selection sort; Exchange sort; Merge and Redix sort; Shell sort; Heap sort as a priority queue; Big \u2018O\u2019 notation and Efficiency of sorting; Search technique; Sequential search, Binary search and Tree search; General search tree; Hashing: Hash function and hash tables, and Collision resolution technique, Undirected and Directed Graphs, Representation of Graph, Transitive closure of graph, Warshall\u2019s algorithm, Depth First Traversal and Breadth First Traversal of Graph, Topological sorting (Depth first, Breadth first topological sorting), Minimum spanning trees ( Prim\u2019s, Kruskal\u2019s and Round- Robin algorithms), Shortest-path algorithm (Greedy algorithm, and Dijkstra\u2019s Algorithm)",
			chapterId:
				"data-structures-and-algorithm-database-system-and-operating-system",
		},
		{
			id: "introduction-to-data-models-normalization-and-sql",
			name: "Introduction to data models, normalization, and SQL",
			content:
				"Data Abstraction and Data Independence, Schema and Instances, E-R Model, Strong and Weak Entity Sets, Attributes and Keys, and E-R Diagram, Different Normal Forms (1st, 2nd, 3rd, BCNF), Functional Dependencies, Integrity Constraints and Domain Constraints, Relations (Joined, Derived), Queries under DDL and DML Commands, Views, Assertions and Triggering, Relational Algebra, Query Cost Estimation, Query Operations, Evaluation of Expressions, Query Optimization, and Query Decomposition.",
			chapterId:
				"data-structures-and-algorithm-database-system-and-operating-system",
		},
		{
			id: "transaction-processing-concurrency-control-and-crash-recovery",
			name: "Transaction processing, concurrency control and crash recovery",
			content:
				"ACID properties, Concurrent Executions, Serializability Concept, Lock based Protocols, Deadlock handling and Prevention, Failure Classification, Recovery and Atomicity, and Log-based Recovery.",
			chapterId:
				"data-structures-and-algorithm-database-system-and-operating-system",
		},
		{
			id: "introduction-to-operating-system-and-process-management",
			name: "Introduction to Operating System and process management",
			content:
				"Evolution of Operating System, Type of Operating System, Operating System Components, Operating System Structure, Operating System Services, Introduction to Process, Process description, Process states, Process control, Threads, Processes and Threads, and Types of scheduling, Principles of Concurrency, Critical Region, Race Condition, Mutual Exclusion, Semaphores and Mutex, Message Passing, Monitors, and Classical Problems of Synchronization.",
			chapterId:
				"data-structures-and-algorithm-database-system-and-operating-system",
		},
		{
			id: "memory-management-file-systems-and-system-administration",
			name: "Memory management, file systems and system administration",
			content:
				"Memory address, Swapping and Managing Free Memory Space, Virtual Memory Management, Demand Paging, Performance, and Page Replacement Algorithms, introduction to File, Directory and File Paths, File System Implementation, Impact of Allocation Policy on Fragmentation, Mapping File Blocks on The Disk Platter, File System Performance, Administration Tasks, User Account Management, Start and Shutdown Procedures.",
			chapterId:
				"data-structures-and-algorithm-database-system-and-operating-system",
		},
		{
			id: "software-process-and-requirements",
			name: "Software process and requirements",
			content:
				"Software characteristics, Software quality attributes, Software process model (Agile Model, V-Model, Iterative Model, Prototype Model, and Big Bang Model), Computer-aided software engineering, Functional and non \u2013functional requirements, User requirements, System requirement, Interface specification, The software requirements documents, Requirement\u2019s elicitation and analysis, and Requirement\u2019s validation and management.",
			chapterId: "software-engineering-and-object-oriented-analysis-and-design",
		},
		{
			id: "software-design",
			name: "Software design",
			content:
				"Design process, Design Concepts, Design Mode, Design Heuristic, Architectural design decisions, System organization, Modular decomposition styles, Control styles, Reference architectures, Multiprocessor architecture, Client \u2013server architectures, Distributed object architectures, Inter-organizational distributed computing, Real \u2013time software design, and Component-based software engineering.",
			chapterId: "software-engineering-and-object-oriented-analysis-and-design",
		},
		{
			id: "software-testing-cost-estimation-quality-management-and-configuration-management",
			name: "Software testing, cost estimation, quality management, and configuration management",
			content:
				"Unit Testing, Integration testing, System testing, Component testing, Acceptance Testing, Test case design, Test automation, Metrics for testing, Algorithmic cost modeling, Project duration and staffing, Software quality assurance, Formal technical reviews, Formal approaches to SQA, Statistical software quality assurance, A framework for software metrics, Matrices for analysis and design model, ISO standards, CMMI, SQA plan, Configuration management planning, Change management, Version and release management, and CASE tools for configuration management.",
			chapterId: "software-engineering-and-object-oriented-analysis-and-design",
		},
		{
			id: "objectoriented-fundamentals-and-analysis",
			name: "Object-oriented fundamentals and analysis",
			content:
				"Defining Models, Requirement Process, Use Cases, Object Oriented Development Cycle, Unified Modeling Language, Building Conceptual Model, Adding Associations and Attributes, and Representation of System Behavior.",
			chapterId: "software-engineering-and-object-oriented-analysis-and-design",
		},
		{
			id: "objectoriented-design",
			name: "Object-oriented design",
			content:
				"Analysis to Design, Describing and Elaborating Use Cases, Collaboration Diagram, Objects and Patterns, Determining Visibility, and Class Diagram.",
			chapterId: "software-engineering-and-object-oriented-analysis-and-design",
		},
		{
			id: "objectoriented-design-implementation",
			name: "Object-oriented design implementation",
			content:
				"Programming and Development Process, Mapping Design to Code, Creating Class Definitions, from Design Class Diagrams, Creating Methods from Collaboration Diagram, Updating Class Definitions, Classes in Code, and Exception and Error Handling.",
			chapterId: "software-engineering-and-object-oriented-analysis-and-design",
		},
		{
			id: "introduction-to-ai-and-intelligent-agent",
			name: "Introduction to AI and intelligent agent",
			content:
				"Concept of Artificial Intelligence, AI Perspectives, History of AI, Applications of AI, Foundations of AI, Introduction of agents, Structure of Intelligent agent, Properties of Intelligent Agents, PEAS description of Agents, Types of Agents: Simple Reflexive, Model Based, Goal Based, Utility Based; and Environment Types: Deterministic, Stochastic, Static, Dynamic, Observable, Semi-observable, Single Agent, Multi Agent.",
			chapterId: "artificial-intelligence-and-neural-networks",
		},
		{
			id: "problem-solving-and-searching-techniques",
			name: "Problem solving and searching techniques",
			content:
				"Definition, Problem as a state space search, Problem formulation, Well-defined problems, Constraint satisfaction problem, Uninformed search techniques (Depth First Search, Breadth First Search, Depth Limited Search, Iterative Deepening Search, Bidirectional Search), Informed Search (Greedy Best first search, A* search, Hill Climbing, Simulated Annealing), Game playing, Adversarial search techniques, Mini-max Search, and Alpha-Beta Pruning.",
			chapterId: "artificial-intelligence-and-neural-networks",
		},
		{
			id: "knowledge-representation",
			name: "Knowledge representation",
			content:
				"Knowledge representations and Mappings, Approaches to Knowledge Representation, Issues in Knowledge Representation, Semantic Nets, Frames, Propositional Logic(PL) (Syntax, Semantics, Formal logic-connectives, tautology, validity, well-formed-formula, Inference using Resolution), Predicate Logic (FOPL, Syntax, Semantics, Quantification, Rules of inference, unification, resolution refutation system), Bayes' Rule and its use, Bayesian Networks, and Reasoning in Belief Networks.",
			chapterId: "artificial-intelligence-and-neural-networks",
		},
		{
			id: "expert-system-and-natural-language-processing",
			name: "Expert system and natural language processing",
			content:
				"Expert Systems, Architecture of an expert system, Knowledge acquisition, Declarative knowledge vs Procedural knowledge, Development of Expert Systems, Natural Language Processing Terminology, Natural Language Understanding and Natural Language Generation, Steps of Natural Language Processing, Applications of NLP, NLP Challenges, Machine Vision Concepts, Machine Vision Stages, and Robotics.",
			chapterId: "artificial-intelligence-and-neural-networks",
		},
		{
			id: "machine-learning",
			name: "Machine learning",
			content:
				"Introduction to Machine Learning, Concepts of Learning, Supervised, Unsupervised and Reinforcement Learning, Inductive learning (Decision Tree), Statistical-based Learning (Naive Bayes Model), Fuzzy learning, Fuzzy Inferences System, Fuzzy Inference Methods, Genetic Algorithm (Genetic Algorithm Operators, Genetic Algorithm Encoding, Selection Algorithms, Fitness function, and Genetic Algorithm Parameters).",
			chapterId: "artificial-intelligence-and-neural-networks",
		},
		{
			id: "neural-networks",
			name: "Neural networks",
			content:
				"Biological Neural Networks Vs. Artificial Neural Networks (ANN), McCulloch Pitts Neuron, Mathematical Model of ANN, Activation functions, Architectures of Neural Networks, The Perceptron, The Learning Rate, Gradient Descent, The Delta Rule, Hebbian learning, Adaline network, Multilayer Perceptron Neural Networks, Backpropagation Algorithm, Hopfield Neural Network.",
			chapterId: "artificial-intelligence-and-neural-networks",
		},
		{
			id: "engineering-drawings-and-its-concepts",
			name: "Engineering drawings and its concepts",
			content:
				"Fundamentals of standard drawing sheets, dimensions, scale, line diagram, orthographic projection, isometric projection/view, pictorial views, and sectional drawing.",
			chapterId: "project-planning-design-and-implementation",
		},
		{
			id: "engineering-economics",
			name: "Engineering Economics",
			content:
				"understanding of project cash flow; discount rate, interest and time value of money; basic methodologies for engineering economics analysis (Discounted Payback Period, NPV, IRR & MARR); comparison of alternatives, depreciation system and taxation system in Nepal.",
			chapterId: "project-planning-design-and-implementation",
		},
		{
			id: "project-planning-and-scheduling",
			name: "Project planning and scheduling",
			content:
				"project classifications; project life cycle phases; project planning process; project scheduling (bar chart, CPM, PERT); resources levelling and smoothing; monitoring/evaluation/controlling.",
			chapterId: "project-planning-design-and-implementation",
		},
		{
			id: "project-management",
			name: "Project management",
			content:
				"Information system; project risk analysis and management; project financing, tender and its process, and contract management.",
			chapterId: "project-planning-design-and-implementation",
		},
		{
			id: "engineering-professional-practice",
			name: "Engineering professional practice",
			content:
				"Environment and society; professional ethics; regulatory environment; contemporary issues/problems in engineering; occupational health and safety; roles/responsibilities of Nepal Engineers Association (NEA).",
			chapterId: "project-planning-design-and-implementation",
		},
		{
			id: "engineering-regulatory-body",
			name: "Engineering Regulatory Body",
			content: "Nepal Engineering Council (Acts & Regulations).",
			chapterId: "project-planning-design-and-implementation",
		},
	]);

	const end = Date.now();

	console.log(`✅ Database see in ${end - start}ms`);

	process.exit(0);
};

runSeed().catch((err) => {
	console.error("❌ Migration failed");
	console.error(err);
	process.exit(1);
});
