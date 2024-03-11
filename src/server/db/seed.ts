/* eslint-disable no-console */

import { db } from ".";
import {
	chapters,
	courses,
	coursesToChapters,
	exams,
	patterns,
	patternsToSubChapters,
	subChapters,
} from "./schema";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const QUESTIONS: {
	name: string;
	question_number: number;
	weight: "1" | "2";
	subChapterId: string | null; // Should not be null
	options: {
		text: string;
		isAnswer: boolean | null;
	}[];
	solution?: string;
}[] = [
	{
		name: "Decibel relation for power gain is:",
		question_number: 1,
		weight: "1",
		subChapterId: "basic-concept",
		options: [
			{
				text: "𝑁_𝑑𝐵 = 20 𝑙𝑜𝑔_10 (𝑉_2^2/𝑉_1^2) + 20 𝑙𝑜𝑔10 (𝑍_1/𝑍_2)",
				isAnswer: null,
			},
			{
				text: "𝑁_𝑑𝐵 = 10 𝑙𝑜𝑔_10 (𝑉_2^2/𝑉_1^2) + 10 𝑙𝑜𝑔10 (𝑍_1/𝑍_2)",
				isAnswer: true,
			},
			{
				text: "𝑁_𝑑𝐵 = 20 𝑙𝑜𝑔_10 (𝑉_2/𝑉_1) + 10 𝑙𝑜𝑔10 (𝑍_2/𝑍_1)",
				isAnswer: null,
			},
			{
				text: "𝑁_𝑑𝐵 = 10 𝑙𝑜𝑔_10 (𝑉_2/𝑉_1) + 10 𝑙𝑜𝑔10 (𝑍_2/𝑍_1)",
				isAnswer: null,
			},
		],
		solution:
			"Decibels (dB) are used to express the ratio of two power levels. \n The equation relates the output voltage (V2) and input voltage (V1) along with their impedances (Z1 and Z2). \n Power is proportional to the square of voltage and inversely proportional to impedance (P = V^2/Z).",
	},
	{
		name: "Maximum power that can be transfer from source to load is:",
		question_number: 2,
		weight: "1",
		subChapterId: "network-theorems",
		options: [
			{
				text: "25%",
				isAnswer: null,
			},
			{
				text: "75%",
				isAnswer: null,
			},
			{
				text: "50%",
				isAnswer: null,
			},
			{
				text: "100%",
				isAnswer: true,
			},
		],
		solution:
			"Maximum power transfer occurs when the load impedance (ZL) is the complex conjugate of the source impedance (ZS). \n Under this condition, all the source's power is delivered to the load.",
	},
	{
		name: "Power factor 𝑅/𝑍 has maximum value of:",
		question_number: 3,
		weight: "1",
		subChapterId: "alternating-current-fundamentals",
		options: [
			{
				text: "0.0",
				isAnswer: null,
			},
			{
				text: "0.5",
				isAnswer: null,
			},
			{
				text: "1.0",
				isAnswer: true,
			},
			{
				text: "1.5",
				isAnswer: null,
			},
		],
		solution:
			"Power factor (PF) represents the ratio of real power (P) to apparent power (S). \n PF = P / S = R / (R^2 + X^2)^0.5, where R is resistance and X is reactance. \n For maximum real power transfer (100% as seen above), the reactance (X) needs to be zero, resulting in a purely resistive circuit and a power factor of 1.",
	},
	{
		name: "EEPROM has drain and floating gate gap of …..",
		question_number: 4,
		weight: "1",
		subChapterId: "semiconductor-devices",
		options: [
			{
				text: "5 nm",
				isAnswer: null,
			},
			{
				text: "10 nm",
				isAnswer: true,
			},
			{
				text: "12 nm",
				isAnswer: null,
			},
			{
				text: "15 nm",
				isAnswer: null,
			},
		],
		solution:
			"EEPROM (Electrically Erasable Programmable Read-Only Memory) uses a floating gate with a very thin oxide layer (typically around 10 nm) to store data.",
	},
	{
		name: "Heisenberg principle of uncertainty says:",
		question_number: 5,
		weight: "1",
		subChapterId: "signal-generator",
		options: [
			{
				text: "Signal of 10Hz can be generated.",
				isAnswer: null,
			},
			{
				text: "Signal of 10MHz can be generated.",
				isAnswer: null,
			},
			{
				text: "Signal of 100MHz can be generated.",
				isAnswer: null,
			},
			{
				text: "Signal of band 100MHz-105MHz can be generated",
				isAnswer: true,
			},
		],
		solution:
			"Heisenberg's uncertainty principle states that the more precisely you know the momentum (p) of a particle, the less precisely you can know its position (x), and vice versa. It can be applied to signal generation as well.\n \nA pure 100 MHz sine wave would require an infinite duration, which is impossible \nHowever, you can generate a signal with a frequency band centered at 100 MHz, encompassing a range of frequencies (e.g., 100MHz-105MHz).",
	},
	{
		name: "UHF frequency signal can be amplified using:",
		question_number: 6,
		weight: "1",
		subChapterId: "amplifiers",
		options: [
			{
				text: "Class A amplifier",
				isAnswer: null,
			},
			{
				text: "Class AB amplifier",
				isAnswer: null,
			},
			{
				text: "Class C amplifier",
				isAnswer: true,
			},
			{
				text: "Class B amplifier",
				isAnswer: null,
			},
		],
		solution:
			"Class C amplifiers are suitable for high-frequency applications like UHF due to their high efficiency (but distorted output).",
	},
	{
		name: "Two’s complement of 00011011 is:",
		question_number: 7,
		weight: "1",
		subChapterId: "digital-logic",
		options: [
			{
				text: "11100100",
				isAnswer: null,
			},
			{
				text: "11100101",
				isAnswer: true,
			},
			{
				text: "11000101",
				isAnswer: null,
			},
			{
				text: "11110001",
				isAnswer: null,
			},
		],
		solution:
			"To find the two's complement:\n Invert each bit (0 becomes 1, 1 becomes 0)\n Add 1 to the result.",
	},
	{
		name: "Elementary building block of combinational circuit is:",
		question_number: 8,
		weight: "1",
		subChapterId: "combinational-and-arithmetic-circuits",
		options: [
			{
				text: "Logic gate",
				isAnswer: true,
			},
			{
				text: "Flip-flop",
				isAnswer: null,
			},
			{
				text: "Both logic gate and flip-flop",
				isAnswer: null,
			},
			{
				text: "Memory",
				isAnswer: null,
			},
		],
		solution:
			"Logic gates (AND, OR, NOT, etc.) are the fundamental building blocks of combinational circuits.",
	},
	{
		name: "Synchronous circuit that changes its state at specific clock signal is:",
		question_number: 9,
		weight: "1",
		subChapterId: "sequential-logic-circuit",
		options: [
			{
				text: "Event driven",
				isAnswer: null,
			},
			{
				text: "Clock driven",
				isAnswer: true,
			},
			{
				text: "Pulse driven",
				isAnswer: null,
			},
			{
				text: "Frequency driven",
				isAnswer: null,
			},
		],
		solution:
			"Synchronous circuits change their state at specific clock signal edges (rising or falling).",
	},
	{
		name: "Bandwidth of microprocessor represents:",
		question_number: 10,
		weight: "1",
		subChapterId: "microprocessor",
		options: [
			{
				text: "Clock speed",
				isAnswer: null,
			},
			{
				text: "Width of internal bus",
				isAnswer: null,
			},
			{
				text: "Number of bit processed/instruction",
				isAnswer: null,
			},
			{
				text: "Number of bit processed/sec",
				isAnswer: true,
			},
		],
		solution:
			"Bandwidth in a microprocessor context often refers to its data processing throughput, measured in bits per second.",
	},
	{
		name: "PPI 8255 has internal bus of size:",
		question_number: 11,
		weight: "1",
		subChapterId: "microprocessor-system",
		options: [
			{
				text: "4 bit",
				isAnswer: null,
			},
			{
				text: "8 bit",
				isAnswer: true,
			},
			{
				text: "16 bit",
				isAnswer: null,
			},
			{
				text: "32 bit",
				isAnswer: null,
			},
		],
		solution:
			"The 8255 PPI has an 8-bit internal data bus for communication with the CPU.",
	},
	{
		name: "Interrupt Service Route (ISR) executes",
		question_number: 12,
		weight: "1",
		subChapterId: "interrupt-operations",
		options: [
			{
				text: "Before execution of current instructions",
				isAnswer: null,
			},
			{
				text: "With pause of current instructions",
				isAnswer: null,
			},
			{
				text: "After execution of current instructions",
				isAnswer: true,
			},
			{
				text: "With execution of no instruction",
				isAnswer: null,
			},
		],
		solution:
			"The CPU typically finishes the current instruction before executing the ISR to maintain program integrity.",
	},
	{
		name: "Which of the following is not a data type in C?",
		question_number: 13,
		weight: "1",
		subChapterId: "introduction-to-c-programming",
		options: [
			{
				text: "int",
				isAnswer: null,
			},
			{
				text: "float",
				isAnswer: null,
			},
			{
				text: "String",
				isAnswer: true,
			},
			{
				text: "char",
				isAnswer: null,
			},
		],
		solution:
			"C doesn't have a built-in string data type. Strings are typically represented as character arrays.",
	},
	{
		name: "What is the size of a pointer in C?",
		question_number: 14,
		weight: "1",
		subChapterId: "pointers-structure-and-data-files-in-c-programming",
		options: [
			{
				text: "1 byte",
				isAnswer: null,
			},
			{
				text: "2 bytes",
				isAnswer: null,
			},
			{
				text: "4 bytes",
				isAnswer: null,
			},
			{
				text: "It depends on the system architecture",
				isAnswer: true,
			},
		],
		solution:
			"Unlike some fixed-size data types, the size of a pointer in C can vary depending on the computer architecture (32-bit vs. 64-bit) being used.\n \n On a 32-bit system, a pointer typically occupies 4 bytes. \n On a 64-bit system, a pointer is usually 8 bytes.",
	},
	{
		name: "Which access specifier is used to make the members of a class accessible only within the same class?",
		question_number: 15,
		weight: "1",
		subChapterId: "cpp-language-constructs-with-objects-and-classes",
		options: [
			{
				text: "public",
				isAnswer: null,
			},
			{
				text: "private",
				isAnswer: true,
			},
			{
				text: "protected",
				isAnswer: null,
			},
			{
				text: "public and protected",
				isAnswer: null,
			},
		],
		solution:
			"The private access specifier restricts member access within the same class.",
	},
	{
		name: "What is operator overloading in C++?",
		question_number: 16,
		weight: "1",
		subChapterId: "features-of-objectoriented-programming",
		options: [
			{
				text: "Defining a new operator.",
				isAnswer: null,
			},
			{
				text: "Overriding an existing operator.",
				isAnswer: null,
			},
			{
				text: "Changing the behaviour of an existing operator.",
				isAnswer: true,
			},
			{
				text: "Changing the behaviour of new operator.",
				isAnswer: null,
			},
		],
		solution:
			"Operator overloading allows you to redefine the behavior of existing operators (like +, -, *, etc.) for user-defined data types (classes).",
	},
	{
		name: "What is the difference between ifstream and ofstream in C++?",
		question_number: 17,
		weight: "1",
		subChapterId: "pure-virtual-function-and-file-handling",
		options: [
			{
				text: "ifstream is used for input, while ofstream is used for output.",
				isAnswer: true,
			},
			{
				text: "ofstream is used for input, while ifstream is used for output.",
				isAnswer: null,
			},
			{
				text: "both are used as input.",
				isAnswer: null,
			},
			{
				text: "both are used as output",
				isAnswer: null,
			},
		],
		solution:
			"ifstream: Used to create an input file stream object for reading data from a file. \n ofstream: Used to create an output file stream object for writing data to a file.",
	},
	{
		name: "What is a class template in C++?",
		question_number: 18,
		weight: "1",
		subChapterId: "generic-programming-and-exception-handling",
		options: [
			{
				text: "A class that can be used to create objects of different types.",
				isAnswer: true,
			},
			{
				text: "A function that can be used to create objects of different types.",
				isAnswer: null,
			},
			{
				text: "A variable that can be used to create objects of different types.",
				isAnswer: null,
			},
			{
				text: "A character that can be used to create objects of different types.",
				isAnswer: null,
			},
		],
		solution:
			"Class templates provide a blueprint for creating classes with different data types.",
	},
	{
		name: "What is the purpose of the control unit in a CPU?",
		question_number: 19,
		weight: "2",
		subChapterId: "control-and-central-processing-units",
		options: [
			{
				text: "To perform arithmetic and logical operations on data.",
				isAnswer: null,
			},
			{
				text: "To store and retrieve data from memory.",
				isAnswer: null,
			},
			{
				text: "To interpret instructions and control the flow of data within the CPU.",
				isAnswer: true,
			},
			{
				text: "To print data from memory",
				isAnswer: null,
			},
		],
		solution:
			"The control unit (CU) fetches instructions from memory, decodes them, and controls the flow of data within the CPU.",
	},
	{
		name: "What is the purpose of the cache replacement policy?",
		question_number: 20,
		weight: "2",
		subChapterId: "computer-arithmetic-and-memory-system",
		options: [
			{
				text: "To determine which data to store in the cache.",
				isAnswer: null,
			},
			{
				text: "To determine which data to evict from the cache when space is needed.",
				isAnswer: true,
			},
			{
				text: "To determine how many levels of cache to use.",
				isAnswer: null,
			},
			{
				text: "To determined which data to store in RAM.",
				isAnswer: null,
			},
		],
		solution:
			"Cache replacement policies define how to choose which data block to remove from the cache when a new block needs to be loaded.",
	},
	{
		name: "Which of the following is not a type of DMA transfer mode?",
		question_number: 21,
		weight: "2",
		subChapterId: "inputoutput-organization-and-multiprocessor",
		options: [
			{
				text: "Burst mode",
				isAnswer: null,
			},
			{
				text: "Cycle-stealing mode",
				isAnswer: null,
			},
			{
				text: "Interrupt mode",
				isAnswer: null,
			},
			{
				text: "Instruction mode.",
				isAnswer: true,
			},
		],
		solution:
			"Direct Memory Access (DMA) allows data transfer between an I/O device and memory without CPU intervention. Common modes include: \n Burst mode \n Cycle-stealing mode \n Block transfer mode",
	},
	{
		name: "An instruction set refers to a set of -----------",
		question_number: 22,
		weight: "2",
		subChapterId: "hardwaresoftware-design-issues-on-embedded-system",
		options: [
			{
				text: "rules for writing code in a specific programming language.",
				isAnswer: null,
			},
			{
				text: "instructions that a processor can execute.",
				isAnswer: true,
			},
			{
				text: "input/output operations that a processor can perform.",
				isAnswer: null,
			},
			{
				text: "printing command",
				isAnswer: null,
			},
		],
		solution:
			"An instruction set is a collection of instructions that a specific processor can understand and execute.",
	},
	{
		name: "What is a real-time kernel?",
		question_number: 23,
		weight: "2",
		subChapterId: "realtime-operating-and-control-system",
		options: [
			{
				text: "The core component of a real-time operating system.",
				isAnswer: true,
			},
			{
				text: "The user interface of a real-time operating system.",
				isAnswer: null,
			},
			{
				text: "The hardware component of a real-time operating system.",
				isAnswer: null,
			},
			{
				text: "The core component of a real-time pointer system.",
				isAnswer: null,
			},
		],
		solution:
			"A real-time kernel is the heart of a real-time operating system (RTOS), responsible for task scheduling and ensuring timely responses.",
	},
	{
		name: "What is a signal in VHDL?",
		question_number: 24,
		weight: "1",
		subChapterId: "hardware-descripts-language-and-ic-technology",
		options: [
			{
				text: "A variable used to store a value in a digital circuit.",
				isAnswer: true,
			},
			{
				text: "A physical wire used to transmit data in a digital circuit.",
				isAnswer: null,
			},
			{
				text: "A function used to perform a specific task in VHDL.",
				isAnswer: null,
			},
			{
				text: "A file used to store a specific task.",
				isAnswer: null,
			},
		],
		solution:
			"Signals represent data flowing through a digital circuit and can be assigned values (0 or 1).",
	},
	{
		name: "Which of the following is an example of a physical layer protocol?",
		question_number: 25,
		weight: "2",
		subChapterId: "introduction-to-computer-networks-and-physical-layer",
		options: [
			{
				text: "Ethernet",
				isAnswer: true,
			},
			{
				text: "TCP",
				isAnswer: null,
			},
			{
				text: "HTTP",
				isAnswer: null,
			},
			{
				text: "ISP",
				isAnswer: null,
			},
		],
		solution:
			"The physical layer (layer 1) of the OSI model deals with the physical transmission of data bits over a communication channel. Ethernet is a common physical layer protocol.",
	},
	{
		name: "The PPP of the OSI model operates at ---------------",
		question_number: 26,
		weight: "2",
		subChapterId: "data-link-layer",
		options: [
			{
				text: "Physical layer",
				isAnswer: true,
			},
			{
				text: "Data link layer",
				isAnswer: null,
			},
			{
				text: "Network layer",
				isAnswer: null,
			},
			{
				text: "Transport layer",
				isAnswer: null,
			},
		],
		solution:
			"The Point-to-Point Protocol (PPP) operates at the physical layer, encapsulating data packets for transmission over serial links.",
	},
	{
		name: "Which of the following is a type of routing algorithm used in the network layer?",
		question_number: 27,
		weight: "2",
		subChapterId: "network-layer",
		options: [
			{
				text: "Link-state routing",
				isAnswer: null,
			},
			{
				text: "Distance-vector routing",
				isAnswer: null,
			},
			{
				text: "Path-vector routing",
				isAnswer: null,
			},
			{
				text: "All of the above.",
				isAnswer: true,
			},
		],
		solution:
			"Common routing algorithms include: \n Link-state routing: Uses information about the entire network topology. \n Distance-vector routing: Exchanges information about distances to destinations with neighboring routers. \n Path-vector routing: Similar to distance-vector but includes path information.",
	},
	{
		name: "Which protocol is responsible for error detection and correction at the transport layer?",
		question_number: 28,
		weight: "2",
		subChapterId: "transport-layer",
		options: [
			{
				text: "TCP",
				isAnswer: true,
			},
			{
				text: "UDP",
				isAnswer: null,
			},
			{
				text: "ICMP",
				isAnswer: null,
			},
			{
				text: "ARP",
				isAnswer: null,
			},
		],
		solution:
			"Transmission Control Protocol (TCP) is a transport layer protocol that provides reliable data transfer with error detection and correction mechanisms.",
	},
	{
		name: "Which application layer protocol is used for sending and receiving emails?",
		question_number: 29,
		weight: "2",
		subChapterId: "application-layer",
		options: [
			{
				text: "HTTP",
				isAnswer: null,
			},
			{
				text: "FTP",
				isAnswer: null,
			},
			{
				text: "SMTP",
				isAnswer: true,
			},
			{
				text: "POP",
				isAnswer: null,
			},
		],
		solution:
			"Simple Mail Transfer Protocol (SMTP) is the primary protocol for sending emails.",
	},
	{
		name: "Which of the following is not a common type of firewall?",
		question_number: 30,
		weight: "2",
		subChapterId: "network-security",
		options: [
			{
				text: "Packet-filtering firewall",
				isAnswer: null,
			},
			{
				text: "Stateful inspection firewall",
				isAnswer: null,
			},
			{
				text: "Proxy firewall",
				isAnswer: null,
			},
			{
				text: "Encryption firewall",
				isAnswer: true,
			},
		],
		solution:
			"Firewalls typically filter traffic based on rules (packet filtering, stateful inspection, etc.). Encryption is a separate security mechanism.",
	},
	{
		name: "What are the basic limitations of finite state machine?",
		question_number: 31,
		weight: "2",
		subChapterId: "introduction-to-finite-automata",
		options: [
			{
				text: "It cannot remember grammar for a language",
				isAnswer: null,
			},
			{
				text: "It cannot remember arbitrarily large amount of information",
				isAnswer: true,
			},
			{
				text: "It cannot remember language generated from a grammar",
				isAnswer: null,
			},
			{
				text: "In cannot remember state transitions",
				isAnswer: null,
			},
		],
		solution:
			"FSMs have a finite number of states and limited memory, making them unsuitable for tasks requiring unbounded memory.",
	},
	{
		name: "Which of the following Machine is specific for Context free grammar?",
		question_number: 32,
		weight: "2",
		subChapterId: "introduction-to-context-free-language",
		options: [
			{
				text: "Finite state automata",
				isAnswer: null,
			},
			{
				text: "Push down automata",
				isAnswer: true,
			},
			{
				text: "Linear bounded automata",
				isAnswer: null,
			},
			{
				text: "Turing Machine",
				isAnswer: null,
			},
		],
		solution:
			"PDAs can handle context-free grammars by using a stack to store and manipulate symbols during parsing.",
	},
	{
		name: "Turing machine (TM) is more powerful than FMS (Finite State Machine) because",
		question_number: 33,
		weight: "2",
		subChapterId: "turing-machine",
		options: [
			{
				text: "tape movement is confined to one direction",
				isAnswer: null,
			},
			{
				text: "it has no finite state",
				isAnswer: null,
			},
			{
				text: "it has the capability to remember arbitrarily long sequences of input symbols",
				isAnswer: true,
			},
			{
				text: "it has finite state",
				isAnswer: null,
			},
		],
		solution:
			"Turing machines (TMs) are more powerful than FSMs because they have a read/write head that can move on an infinite tape, allowing them to store and access information as needed. \n FSMs are limited to a finite amount of memory based on their states.",
	},
	{
		name: "Which of these clustering technique permits a convenient graphical display?",
		question_number: 34,
		weight: "2",
		subChapterId: "introduction-of-computer-graphics",
		options: [
			{
				text: "Agglomerative clustering",
				isAnswer: true,
			},
			{
				text: "Hierarchical clustering",
				isAnswer: null,
			},
			{
				text: "Probabilistic model-based clustering",
				isAnswer: null,
			},
			{
				text: "Partition-based clustering",
				isAnswer: null,
			},
		],
		solution:
			"Agglomerative clustering starts with individual data points and iteratively merges them into clusters based on similarity. This approach can be visualized as a dendrogram (tree-like structure).",
	},
	{
		name: "A straight line segment is translated by applying the transformation equation",
		question_number: 35,
		weight: "2",
		subChapterId: "twodimensional-transformation",
		options: [
			{
				text: "P’=P+T",
				isAnswer: true,
			},
			{
				text: "Dx and Dy",
				isAnswer: null,
			},
			{
				text: "P’=P+P",
				isAnswer: null,
			},
			{
				text: "Cy",
				isAnswer: null,
			},
		],
		solution:
			"P represents the original point coordinates. \n P' represents the transformed point coordinates. \n T represents the translation vector (dx, dy) specifying the horizontal and vertical shift.",
	},
	{
		name: "What does composite transformations means?",
		question_number: 36,
		weight: "2",
		subChapterId: "threedimensional-transformation",
		options: [
			{
				text: "Transformations that can be done in sequence",
				isAnswer: true,
			},
			{
				text: "Transformations that cannot be done in sequence",
				isAnswer: null,
			},
			{
				text: "Transformations that can be done simultaneously",
				isAnswer: null,
			},
			{
				text: "Transformations that cannot be done simultaneously",
				isAnswer: null,
			},
		],
		solution:
			"Composite transformations involve applying multiple transformations one after another to an object. The order of application can affect the final result.",
	},
	{
		name: "……………….. level is where the model becomes compatible and executable code",
		question_number: 37,
		weight: "2",
		subChapterId: "introduction-to-data-structure-list-linked-lists-and-trees",
		options: [
			{
				text: "Abstract level",
				isAnswer: null,
			},
			{
				text: "Application level",
				isAnswer: null,
			},
			{
				text: "Implementation level",
				isAnswer: true,
			},
			{
				text: "All of the above",
				isAnswer: null,
			},
		],
		solution:
			"The implementation level focuses on translating the design into actual code using a specific programming language.",
	},
	{
		name: "What is the hash function used in the division method?",
		question_number: 38,
		weight: "2",
		subChapterId: "sorting-searching-and-graphs",
		options: [
			{
				text: "h(k) = k/m",
				isAnswer: null,
			},
			{
				text: "h(k) = k mod m",
				isAnswer: true,
			},
			{
				text: "h(k) = m/k",
				isAnswer: null,
			},
			{
				text: "h(k) = m mod k",
				isAnswer: null,
			},
		],
		solution:
			"The division method uses the modulo (%) operator to map the key (k) to a bucket index within the hash table of size m.",
	},
	{
		name: "Redundancy is reduced in a database table by using the ------------ form.",
		question_number: 39,
		weight: "2",
		subChapterId: "introduction-to-data-models-normalization-and-sql",
		options: [
			{
				text: "Abnormal",
				isAnswer: null,
			},
			{
				text: "Normal",
				isAnswer: true,
			},
			{
				text: "Special",
				isAnswer: null,
			},
			{
				text: "Exactly",
				isAnswer: null,
			},
		],
		solution:
			"Normalization is a process of organizing database tables to minimize redundancy and improve data integrity. It involves breaking down tables into smaller, more focused ones with defined relationships.",
	},
	{
		name: "It is advisable, to store the -------- before applying the actual transaction to the database.",
		question_number: 40,
		weight: "2",
		subChapterId:
			"transaction-processing-concurrency-control-and-crash-recovery",
		options: [
			{
				text: "Data",
				isAnswer: true,
			},
			{
				text: "Logs",
				isAnswer: null,
			},
			{
				text: "Receive",
				isAnswer: null,
			},
			{
				text: "Record",
				isAnswer: null,
			},
		],
		solution:
			"Transactions typically involve reading data, modifying it, and then writing the modified data back to the database. The data is first read and stored before applying the actual changes.",
	},
	{
		name: "To enforce ………………….. two functions are provided enter-critical and exit-critical, where each function takes as an argument the name of the resource that is the subject of competition.",
		question_number: 41,
		weight: "2",
		subChapterId: "introduction-to-operating-system-and-process-management",
		options: [
			{
				text: "Mutual Exclusion",
				isAnswer: true,
			},
			{
				text: "Synchronization",
				isAnswer: null,
			},
			{
				text: "Deadlock",
				isAnswer: null,
			},
			{
				text: "Starvation",
				isAnswer: null,
			},
		],
		solution:
			"These functions are used in semaphore-based concurrency control mechanisms to ensure only one process can access a critical section of code at a time.",
	},
	{
		name: "If you wanted to require that a user enter an Administrator password to perform administrative tasks, what type of user account should you create for the user?",
		question_number: 42,
		weight: "2",
		subChapterId: "memory-management-file-systems-and-system-administration",
		options: [
			{
				text: "Administrator User account",
				isAnswer: true,
			},
			{
				text: "Standard User account",
				isAnswer: null,
			},
			{
				text: "Power User account",
				isAnswer: null,
			},
			{
				text: "Authenticated User account",
				isAnswer: null,
			},
		],
		solution:
			"Administrator accounts have full privileges to manage the system, including adding/removing users, modifying permissions, and performing administrative tasks.",
	},
	{
		name: "The process to gather the software requirements from client, analyze and document them is known as ___________________.",
		question_number: 43,
		weight: "2",
		subChapterId: "software-process-and-requirements",
		options: [
			{
				text: "Feasibility Study",
				isAnswer: null,
			},
			{
				text: "Requirement Gathering",
				isAnswer: null,
			},
			{
				text: "Requirement Engineering",
				isAnswer: true,
			},
			{
				text: "System Requirements Specification",
				isAnswer: null,
			},
		],
		solution:
			"Requirement engineering involves a set of activities to gather, analyze, and document software requirements from stakeholders. It encompasses requirement gathering, specification, and validation.",
	},
	{
		name: "What is reference architecture?",
		question_number: 44,
		weight: "2",
		subChapterId: "software-design",
		options: [
			{
				text: "It is a reference model mapped onto software components",
				isAnswer: null,
			},
			{
				text: "It provided data flow with comments",
				isAnswer: null,
			},
			{
				text: "It provides data flow with pieces",
				isAnswer: null,
			},
			{
				text: "It is a reference model mapped onto software components & data flow with comments",
				isAnswer: true,
			},
		],
		solution:
			"A reference architecture provides a high-level blueprint for a system, including its components, interactions, and data flows. It serves as a guide for developing the actual system.",
	},
	{
		name: "Which of the following testing is sometime called as Acceptance testing?",
		question_number: 45,
		weight: "2",
		subChapterId:
			"software-testing-cost-estimation-quality-management-and-configuration-management",
		options: [
			{
				text: "White-box testing",
				isAnswer: null,
			},
			{
				text: "Grey box testing",
				isAnswer: null,
			},
			{
				text: "Alpha testing",
				isAnswer: true,
			},
			{
				text: "Beta testing",
				isAnswer: null,
			},
		],
		solution:
			"Alpha testing is the initial round of user testing conducted by internal testers within the development team. It helps identify usability issues and bugs before beta testing.",
	},
	{
		name: "What is the purpose of representing system behaviour in OOAD?",
		question_number: 46,
		weight: "2",
		subChapterId: "objectoriented-fundamentals-and-analysis",
		options: [
			{
				text: "To document system architecture and components",
				isAnswer: null,
			},
			{
				text: "To identify potential risks and challenges",
				isAnswer: null,
			},
			{
				text: "To understand and model the dynamic aspects of the system",
				isAnswer: true,
			},
			{
				text: "To create user interfaces and interactions",
				isAnswer: null,
			},
		],
		solution:
			"OOD focuses on representing the real-world entities and their interactions using classes and objects. This helps model the system's dynamic behavior and how it changes over time.",
	},
	{
		name: "In object-oriented design, what does visibility refer to?",
		question_number: 47,
		weight: "2",
		subChapterId: "objectoriented-design",
		options: [
			{
				text: "The physical appearance of an object.",
				isAnswer: null,
			},
			{
				text: "The accessibility of class members from other parts of the program.",
				isAnswer: true,
			},
			{
				text: "The process of creating instances of classes.",
				isAnswer: null,
			},
			{
				text: "The relationship between classes in a system.",
				isAnswer: null,
			},
		],
		solution:
			"Visibility specifiers (public, private, protected) control the accessibility of class members (attributes and methods) to other parts of the program.",
	},
	{
		name: "How are relationships between classes represented when mapping design to code?",
		question_number: 48,
		weight: "2",
		subChapterId: "objectoriented-design-implementation",
		options: [
			{
				text: "Through inheritance and implementation of interfaces.",
				isAnswer: true,
			},
			{
				text: "Through the use of composition and aggregation.",
				isAnswer: null,
			},
			{
				text: "Through static method calls and global variables.",
				isAnswer: null,
			},
			{
				text: "Through conditional statements and loops.",
				isAnswer: null,
			},
		],
		solution:
			"Relationships between classes can be established through various mechanisms: \n \n Inheritance: Creates a hierarchical relationship where a subclass inherits properties and methods from a parent class.\n Interfaces: Define contracts that classes can implement, specifying behaviors without implementation details.",
	},
	{
		name: "In which type of environment, the next state of the environment is completely determined by the current state and the action taken by the agent?",
		question_number: 49,
		weight: "2",
		subChapterId: "introduction-to-ai-and-intelligent-agent",
		options: [
			{
				text: "Observable environment",
				isAnswer: null,
			},
			{
				text: "Deterministic environment",
				isAnswer: true,
			},
			{
				text: "Episodic environment",
				isAnswer: null,
			},
			{
				text: "Static environment",
				isAnswer: null,
			},
		],
		solution:
			"In a deterministic environment, the next state is completely determined by the current state and the action taken. There's no randomness or uncertainty.",
	},
	{
		name: "Which searching technique is guaranteed to find the optimal solution in a state space search problem, assuming no path costs?",
		question_number: 50,
		weight: "2",
		subChapterId: "problem-solving-and-searching-techniques",
		options: [
			{
				text: "Depth-first search (DFS)",
				isAnswer: null,
			},
			{
				text: "Breadth-first search (BFS)",
				isAnswer: null,
			},
			{
				text: "Hill climbing",
				isAnswer: null,
			},
			{
				text: "A* search",
				isAnswer: true,
			},
		],
		solution:
			"A* search is guaranteed to find the optimal solution in a state space search problem, assuming no path costs.",
	},
	{
		name: "What is the main goal of the resolution algorithm in inference?",
		question_number: 51,
		weight: "2",
		subChapterId: "knowledge-representation",
		options: [
			{
				text: "To derive new logical axioms",
				isAnswer: null,
			},
			{
				text: "To simplify logical expressions",
				isAnswer: null,
			},
			{
				text: "To prove the satisfiability or un-satisfiability of a given set of logical statements",
				isAnswer: null,
			},
			{
				text: "To find contradictions in the knowledge base",
				isAnswer: null,
			},
		],
	},
	{
		name: "What is the main goal of natural language understanding (NLU)?",
		question_number: 52,
		weight: "2",
		subChapterId: "expert-system-and-natural-language-processing",
		options: [
			{
				text: "Translating text from one language to another",
				isAnswer: null,
			},
			{
				text: "Generating human-like responses to user queries",
				isAnswer: null,
			},
			{
				text: "Analyzing and interpreting the meaning of natural language text",
				isAnswer: null,
			},
			{
				text: "Extracting entities and their relationships from a text",
				isAnswer: null,
			},
		],
	},
	{
		name: "What is fuzzy learning in machine learning?",
		question_number: 53,
		weight: "2",
		subChapterId: "machine-learning",
		options: [
			{
				text: "A type of learning algorithm that uses fuzzy logic to handle uncertain or imprecise data",
				isAnswer: null,
			},
			{
				text: "A learning technique that focuses on training neural networks with fuzzy inputs",
				isAnswer: null,
			},
			{
				text: "A method that uses fuzzy inference to make predictions based on labelled data",
				isAnswer: null,
			},
			{
				text: "A learning approach that emphasizes the use of fuzzy clustering algorithms",
				isAnswer: null,
			},
		],
	},
	{
		name: "Which neural network architecture is commonly used for processing sequential data, such as time series or natural language?Page 8",
		question_number: 54,
		weight: "2",
		subChapterId: "neural-networks",
		options: [
			{
				text: "Feed-forward neural network (FNN)",
				isAnswer: null,
			},
			{
				text: "Self-organizing map (SOM)",
				isAnswer: null,
			},
			{
				text: "Radial basis function network (RBFN)",
				isAnswer: null,
			},
			{
				text: "Recurrent neural network (RNN)",
				isAnswer: null,
			},
		],
	},
	{
		name: "Standard dimensions (mm x mm) of A3 drawing sheet is",
		question_number: 55,
		weight: "2",
		subChapterId: "engineering-drawings-and-its-concepts",
		options: [
			{
				text: "11.69 × 16.54",
				isAnswer: null,
			},
			{
				text: "29.7 × 42",
				isAnswer: null,
			},
			{
				text: "297 × 420",
				isAnswer: null,
			},
			{
				text: "420 × 280",
				isAnswer: null,
			},
		],
	},
	{
		name: "Which of the following methods of charging depreciation of an asset has increased amount of depreciation as the age of asset increases",
		question_number: 56,
		weight: "2",
		subChapterId: "engineering-economics",
		options: [
			{
				text: "sum-of-year digit",
				isAnswer: null,
			},
			{
				text: "sinking fund",
				isAnswer: null,
			},
			{
				text: "diminishing balance",
				isAnswer: null,
			},
			{
				text: "straight line",
				isAnswer: null,
			},
		],
	},
	{
		name: "The process of optimizing the project’s limited resources without extending the project duration is known as",
		question_number: 57,
		weight: "2",
		subChapterId: "project-planning-and-scheduling",
		options: [
			{
				text: "project crashing",
				isAnswer: null,
			},
			{
				text: "resource levelling",
				isAnswer: null,
			},
			{
				text: "resource smoothing",
				isAnswer: null,
			},
			{
				text: "networking",
				isAnswer: null,
			},
		],
	},
	{
		name: "The process of composing/raising the required fund from different sources such as equity, preferred stock, bond and debenture is known as",
		question_number: 58,
		weight: "2",
		subChapterId: "project-management",
		options: [
			{
				text: "capital structure planning",
				isAnswer: null,
			},
			{
				text: "project financing",
				isAnswer: null,
			},
			{
				text: "capital budgeting decision",
				isAnswer: null,
			},
			{
				text: "deducing earning per share",
				isAnswer: null,
			},
		],
	},
	{
		name: "In which of the following society, people used to seek their existence on growing plants for their cattle and domestic animals",
		question_number: 59,
		weight: "2",
		subChapterId: "engineering-professional-practice",
		options: [
			{
				text: "pastoral society",
				isAnswer: null,
			},
			{
				text: "tribal society",
				isAnswer: null,
			},
			{
				text: "horticultural society",
				isAnswer: null,
			},
			{
				text: "agricultural society",
				isAnswer: null,
			},
		],
	},
	{
		name: "According to Nepal Engineering Council Act, 2055 (Revised, 2079), all engineering academic institutions shall be …………………….. in the Council.",
		question_number: 60,
		weight: "2",
		subChapterId: "engineering-regulatory-body",
		options: [
			{
				text: "affiliated",
				isAnswer: null,
			},
			{
				text: "united",
				isAnswer: null,
			},
			{
				text: "recognized",
				isAnswer: null,
			},
			{
				text: "associated",
				isAnswer: null,
			},
		],
	},
	{
		name: "A 10 μH inductor, 40π2 pF capacitor and a 628 Ω resistor are connected to form a series RLC circuit. Calculate Q-factor of this circuit at resonant frequency.",
		question_number: 61,
		weight: "2",
		subChapterId: null,
		options: [
			{
				text: "1.0142x10-6",
				isAnswer: null,
			},
			{
				text: "2.50",
				isAnswer: null,
			},
			{
				text: "1.0142x10-9",
				isAnswer: null,
			},
			{
				text: "2.50x10-3",
				isAnswer: null,
			},
		],
	},
	{
		name: "A 400 mH coil of negligible resistance is connected to an AC circuit in which an effective current of 6 mA is flowing. Find out the voltage across the coil if the frequency is 1000 Hz.",
		question_number: 62,
		weight: "2",
		subChapterId: null,
		options: [
			{
				text: "15.07V",
				isAnswer: null,
			},
			{
				text: "15079.67 V",
				isAnswer: null,
			},
			{
				text: "150.79 V",
				isAnswer: null,
			},
			{
				text: "15079 V",
				isAnswer: null,
			},
		],
	},
	{
		name: "Convert (312)8 into decimal:",
		question_number: 63,
		weight: "2",
		subChapterId: null,
		options: [
			{
				text: "(200)10",
				isAnswer: null,
			},
			{
				text: "(202)10",
				isAnswer: null,
			},
			{
				text: "(204)10",
				isAnswer: null,
			},
			{
				text: "(206)10",
				isAnswer: null,
			},
		],
	},
	{
		name: "A microcontroller is running a program with a clock frequency of 8 MHz. The microcontroller receives an interrupt request from an external device that requires 20 cycles to service. What is the time required to service the interrupt?",
		question_number: 64,
		weight: "2",
		subChapterId: null,
		options: [
			{
				text: "2.5 µs",
				isAnswer: null,
			},
			{
				text: "20 ns",
				isAnswer: null,
			},
			{
				text: "40 ns",
				isAnswer: null,
			},
			{
				text: "160 ns",
				isAnswer: null,
			},
		],
	},
	{
		name: "Output of the program below will be ------------- \\n  #include <iostream>\\n  class Encapsulation {\\n private: int data;\\n public: Encapsulation() : data(0) {}\\n  void setData(int value) {\\n  data = value;\\n  }\\n  int getData() {\\n  return data;\\n  }\\n };\\n Page 10\\n int main() {\\n  Encapsulation obj;\\n  std::cout << obj.getData() << std::endl;\\n  return 0;\\n }",
		question_number: 65,
		weight: "2",
		subChapterId: null,
		options: [
			{
				text: "0",
				isAnswer: null,
			},
			{
				text: "Garbage value",
				isAnswer: null,
			},
			{
				text: "Compilation error",
				isAnswer: null,
			},
			{
				text: "Runtime error",
				isAnswer: null,
			},
		],
	},
	{
		name: "What is the output of the following C code? \\n int x = 10, y = 20;\\n int *p = &x, *q = &y;\\n *p = *q;\\n *q = 30;",
		question_number: 66,
		weight: "2",
		subChapterId: null,
		options: [
			{
				text: "x = 10, y = 20",
				isAnswer: null,
			},
			{
				text: "x = 20, y = 30",
				isAnswer: null,
			},
			{
				text: "x = 30, y = 20",
				isAnswer: null,
			},
			{
				text: "x = 30, y = 30",
				isAnswer: null,
			},
		],
	},
	{
		name: "What is the result of the (0x5A3D - 0x28F1) + 0xABCD in hexadecimal notation?",
		question_number: 67,
		weight: "2",
		subChapterId: null,
		options: [
			{
				text: "0x8D7F",
				isAnswer: null,
			},
			{
				text: "0x8E7E",
				isAnswer: null,
			},
			{
				text: "0x8F7D",
				isAnswer: null,
			},
			{
				text: "0x907C",
				isAnswer: null,
			},
		],
	},
	{
		name: "What is the output of the y <= (a and b) xor (not b and c); VHDL code?",
		question_number: 68,
		weight: "2",
		subChapterId: null,
		options: [
			{
				text: "AND gate",
				isAnswer: null,
			},
			{
				text: "OR gate",
				isAnswer: null,
			},
			{
				text: "XOR gate",
				isAnswer: null,
			},
			{
				text: "NAND gate",
				isAnswer: null,
			},
		],
	},
	{
		name: "What is the data rate required to transmit signal with max frequency component of 10KHz for 8 bit per symbol?",
		question_number: 69,
		weight: "2",
		subChapterId: null,
		options: [
			{
				text: "80 KBPs",
				isAnswer: null,
			},
			{
				text: "160 KBPs",
				isAnswer: null,
			},
			{
				text: "< 160 KBPs",
				isAnswer: null,
			},
			{
				text: "< 80 KBPs",
				isAnswer: null,
			},
		],
	},
	{
		name: "A data packet of size 1500 bytes is to be transmitted over a network crossing 2 routers in between. Each network layer adds a header of 20 bytes. The packet is then encapsulated by a data link layer that adds a header of 30 bytes and a trailer of 10 bytes. What is the total size of the packet, including all headers and the data payload?",
		question_number: 70,
		weight: "2",
		subChapterId: null,
		options: [
			{
				text: "1550 bytes",
				isAnswer: null,
			},
			{
				text: "1560 bytes",
				isAnswer: null,
			},
			{
				text: "1620 bytes",
				isAnswer: null,
			},
			{
				text: "1680 bytes",
				isAnswer: null,
			},
		],
	},
	{
		name: "Consider CFG with {S,A,B} as the non-terminal alphabet, {a,b} as the terminal alphabet, S as the start symbol and the following set of production rules S->aB S->bA B->aB->bS A->aS B->aBB A-> bAA which of the following strings is generated by grammar ?",
		question_number: 71,
		weight: "2",
		subChapterId: null,
		options: [
			{
				text: "aaaabb",
				isAnswer: null,
			},
			{
				text: "aabbbb",
				isAnswer: null,
			},
			{
				text: "aabbab",
				isAnswer: null,
			},
			{
				text: "abbbba",
				isAnswer: null,
			},
		],
	},
	{
		name: "An efficient transformation method which produces a parallel mirror image of an object is also referred as,",
		question_number: 72,
		weight: "2",
		subChapterId: null,
		options: [
			{
				text: "Rotation",
				isAnswer: null,
			},
			{
				text: "Reflection",
				isAnswer: null,
			},
			{
				text: "Shear",
				isAnswer: null,
			},
			{
				text: "Rotation and shear",
				isAnswer: null,
			},
		],
	},
	{
		name: 'What does the following function do for a given Linked List with first node as head? \\n  void fun1(struct node* head) \\n { \\n if (head == NULL) \\n return; \\n fun1(head->next); \\n printf("%d ", head->data); \\n }',
		question_number: 73,
		weight: "2",
		subChapterId: null,
		options: [
			{
				text: "Prints all nodes of linked lists",
				isAnswer: null,
			},
			{
				text: "Prints all nodes of linked list in reverse order",
				isAnswer: null,
			},
			{
				text: "Prints alternate nodes of Linked List",
				isAnswer: null,
			},
			{
				text: "Prints alternate nodes in reverse order",
				isAnswer: null,
			},
		],
	},
	{
		name: "Consider the following three processes in the FCFS. \\n Process ID. Brust-time Arrival-time \\n P1 3 3 \\n P2 6 6 \\n P3 9 9 \\n What is the average waiting time?",
		question_number: 74,
		weight: "2",
		subChapterId: null,
		options: [
			{
				text: "2",
				isAnswer: null,
			},
			{
				text: "3",
				isAnswer: null,
			},
			{
				text: "4",
				isAnswer: null,
			},
			{
				text: "5",
				isAnswer: null,
			},
		],
	},
	{
		name: "Which of the following statements best describes the role of a configuration management tool in software engineering?",
		question_number: 75,
		weight: "2",
		subChapterId: null,
		options: [
			{
				text: "It helps a graphical user interface for designing software architectures.",
				isAnswer: null,
			},
			{
				text: "It helps the process of generating code from high-level models or specifications.",
				isAnswer: null,
			},
			{
				text: "It helps track, control, and manage changes to software artifacts throughout the development lifecycle.",
				isAnswer: null,
			},
			{
				text: "It helps the testing and debugging software applications to ensure their correctness.",
				isAnswer: null,
			},
		],
	},
	{
		name: "What is the correct order of phases in the Object-Oriented Development Cycle?",
		question_number: 76,
		weight: "2",
		subChapterId: null,
		options: [
			{
				text: "Analysis, Design, Implementation, Testing, Maintenance",
				isAnswer: null,
			},
			{
				text: "Design, Analysis, Implementation, Maintenance, Testing",
				isAnswer: null,
			},
			{
				text: "Analysis, Design, Implementation, Maintenance, Testing",
				isAnswer: null,
			},
			{
				text: "Design, Analysis, Testing, Implementation, Maintenance",
				isAnswer: null,
			},
		],
	},
	{
		name: "Greedy Best-First Search is an informed search algorithm that:",
		question_number: 77,
		weight: "2",
		subChapterId: null,
		options: [
			{
				text: "Expands nodes based on their depth in the search tree",
				isAnswer: null,
			},
			{
				text: "Expands nodes based on their evaluation function value",
				isAnswer: null,
			},
			{
				text: "Expands nodes randomly without any heuristic guidance",
				isAnswer: null,
			},
			{
				text: "Expands nodes in a breadth-first manner",
				isAnswer: null,
			},
		],
	},
	{
		name: "Which of the following activation functions is commonly used for the output layer of a binary classification neural network?",
		question_number: 78,
		weight: "2",
		subChapterId: null,
		options: [
			{
				text: "Sigmoid activation function",
				isAnswer: null,
			},
			{
				text: "Tanh activation function",
				isAnswer: null,
			},
			{
				text: "ReLU activation function",
				isAnswer: null,
			},
			{
				text: "Softmax activation function",
				isAnswer: null,
			},
		],
	},
	{
		name: "Effective monthly interest rate will be …………., if nominal interest rate of 10% accounted for continuous compounding",
		question_number: 79,
		weight: "2",
		subChapterId: null,
		options: [
			{
				text: "1%",
				isAnswer: null,
			},
			{
				text: "0.84%",
				isAnswer: null,
			},
			{
				text: "1.2%",
				isAnswer: null,
			},
			{
				text: "2%",
				isAnswer: null,
			},
		],
	},
	{
		name: "By considering following activities of a project, the project duration will be \\n Activity A B C D E \\n Immediate predecessors - - - C A, B, D \\n Duration (days) 4 5 3 7 5",
		question_number: 80,
		weight: "2",
		subChapterId: null,
		options: [
			{
				text: "9 days",
				isAnswer: null,
			},
			{
				text: "10 days",
				isAnswer: null,
			},
			{
				text: "15 days",
				isAnswer: null,
			},
			{
				text: "24 days",
				isAnswer: null,
			},
		],
	},
];

const SUB_CHAPTERS = [
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
		content: "Interrupt, Interrupt Service Routine, and Interrupt Processing.",
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
];

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

	await db.insert(subChapters).values(SUB_CHAPTERS);

	await db.insert(exams).values([
		{
			id: "computer-license-exam",
			name: "Computer License Exam",
			status: "PUBLISHED",
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	]);

	await db.insert(patterns).values([
		...Array.from({ length: 80 }).map((_, i) => ({
			id: `computer-license-exam-${i + 1}`,
			questionNumber: i + 1,
			examId: "computer-license-exam",
			weight: i > 60 ? ("2" as const) : ("1" as const),
		})),
	]);

	let flag1 = 59;
	let flag2 = 60;

	await db.insert(patternsToSubChapters).values([
		...SUB_CHAPTERS.map((subChapter, index) => ({
			patternId: `computer-license-exam-${index + 1}`,
			subChapterId: subChapter.id,
		})),
		...SUB_CHAPTERS.map((subChapter, index) => {
			if (index % 6 === 0) {
				flag1 += 2;
			}

			return {
				patternId: `computer-license-exam-${flag1}`,
				subChapterId: subChapter.id,
			};
		}),
		...SUB_CHAPTERS.map((subChapter, index) => {
			if (index % 6 === 0) {
				flag2 += 2;
			}
			return {
				patternId: `computer-license-exam-${flag2}`,
				subChapterId: subChapter.id,
			};
		}),
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
