/*
  CASE STUDIES: file ini satu-satunya yang perlu kamu edit untuk menambah studi kasus.
  Halaman utama dan halaman detail otomatis ikut berubah.

  Cara tambah: salin satu blok { ... } ke dalam daftar CASES di bawah, isi, lalu pisahkan antar blok dengan koma.

  Aturan:
  - id     : unik, huruf kecil, tanpa spasi (dipakai di link: project-detail.html?id=ram-ssd-upgrade)
  - code   : label singkat untuk daftar (opsional), misal "HW-01"
  - status : jujur. "Course lab" untuk latihan dari kursus, "Home lab" untuk praktik sendiri, "Real case" untuk kejadian nyata
  - sections: bebas jumlahnya. Tiap section punya heading dan boleh punya:
      text    : daftar paragraf
      list    : daftar poin
      ordered : true kalau list-nya langkah berurutan
      images  : [ { src: "images/nama-file.png", alt: "...", caption: "..." } ]
                (gambar yang filenya belum ada otomatis disembunyikan)
  - Pakai tanda kutip ganda "..." dan jangan lupa koma di akhir tiap baris.
*/
window.CASES = [
  {
    "id": "acer-e1-432-repair",
    "code": "REAL-01",
    "title": "Laptop repair and upgrade: Acer E1-432",
    "category": "Hardware",
    "date": "2024",
    "status": "Personal project",
    "tools": [
      "Replacement LCD",
      "Replacement keyboard",
      "512GB SSD",
      "8GB RAM",
      "Windows 10"
    ],
    "summary": "Replaced a damaged screen and keyboard on my own laptop, then upgraded it to an SSD, 8GB of RAM, and Windows 10.",
    "sections": [
      {
        "heading": "Problem",
        "text": [
          "My own laptop, an Acer E1-432, had a damaged screen (a blue screen and lines that kept growing across the display) and a keyboard that no longer responded. It also still ran on its original hardware: a hard drive, 4GB of RAM, and Windows 8."
        ],
        "images": [
          {
            "src": "images/acer-damaged-screen",
            "alt": "The laptop screen showing a blue screen and lines across the display",
            "caption": "The damaged screen before the replacement"
          }
        ]
      },
      {
        "heading": "What I did",
        "ordered": true,
        "list": [
          "Diagnosed the screen as damaged and the keyboard as unresponsive.",
          "Bought a replacement LCD and keyboard, and replaced both myself.",
          "Replaced the hard drive with a 512GB SSD.",
          "Upgraded the RAM from 4GB to 8GB.",
          "Reinstalled the operating system, moving from Windows 8 to Windows 10."
        ]
      },
      {
        "heading": "Result",
        "text": [
          "Boot time and overall speed improved noticeably. The laptop now reports an Intel Celeron 2955U, 8GB of RAM, and a 512GB SSD. The total cost was about IDR 1.7 million."
        ],
        "images": [
          {
            "src": "images/acer-specs.png",
            "alt": "Windows device specifications showing an Intel Celeron 2955U, 8GB of RAM, and a 512GB SSD",
            "caption": "Specs after the upgrade"
          }
        ]
      },
      {
        "heading": "Notes",
        "text": [
          "This was my own laptop, not a client or employer device."
        ]
      }
    ]
  },
  {
    "id": "dhcp-gateway-tickets",
    "code": "NET-02",
    "title": "Wrong gateway and no IP address: two tickets in Packet Tracer",
    "category": "Networking",
    "status": "Simulated scenario",
    "tools": [
      "Cisco Packet Tracer",
      "Cisco IOS CLI",
      "DHCP",
      "ipconfig",
      "ping"
    ],
    "summary": "A practice lab where I built a small office network, then worked two support tickets: a PC with a wrong default gateway and a PC that could not get an address from DHCP.",
    "sections": [
      {
        "heading": "Scenario",
        "text": [
          "This is a simulated scenario in a practice lab. The company (PT Contoh Sejahtera) and the people are fictional, and I used Cisco Packet Tracer.",
          "Two reports came in. Pak Dedi said his computer had \"no connection\". Mbak Dewi could talk to her colleagues' PCs but could not open the internal website. I built a small office network, created both problems on purpose, and handled each one as a ticket.",
          "Total time for the whole case (building the lab, both problems, and the documentation): 50 minutes."
        ]
      },
      {
        "heading": "Lab setup",
        "ordered": true,
        "list": [
          "Added 1 router (2911), 1 switch (2960), 4 PCs, and 1 server.",
          "Connected the router (Gi0/0) to the switch (Fa0/1), and PC1 to PC4 to the switch (Fa0/2 to Fa0/5), with copper straight-through cables.",
          "Connected the server to the router (Gi0/1) with a copper cross-over cable.",
          "Gave the server a static address: 192.168.20.10, mask 255.255.255.0, gateway 192.168.20.1, with the HTTP service turned on.",
          "Saved the lab as 02-dhcp-gateway.pkt."
        ],
        "images": [
          {
            "src": "images/02-01-topologi",
            "alt": "Packet Tracer topology with a router, a switch, four PCs, and a server",
            "caption": "The full topology"
          }
        ]
      },
      {
        "heading": "Router configuration",
        "text": [
          "The router connects the office network (192.168.10.0/24) to the server network (192.168.20.0/24) and hands out addresses with a DHCP pool."
        ],
        "code": "enable\nconfigure terminal\nhostname R-Kantor\ninterface gigabitEthernet0/0\n ip address 192.168.10.1 255.255.255.0\n no shutdown\nexit\ninterface gigabitEthernet0/1\n ip address 192.168.20.1 255.255.255.0\n no shutdown\nexit\nip dhcp excluded-address 192.168.10.1 192.168.10.10\nip dhcp pool KANTOR\n network 192.168.10.0 255.255.255.0\n default-router 192.168.10.1\n dns-server 8.8.8.8\nend\nwrite memory",
        "images": [
          {
            "src": "images/02-02-config-router",
            "alt": "Router running-config showing the interfaces and the DHCP pool",
            "caption": "Router configuration"
          }
        ]
      },
      {
        "heading": "Baseline: everything working",
        "ordered": true,
        "list": [
          "Set PC1 and PC2 to DHCP and waited for an address.",
          "Ran ipconfig on PC1.",
          "Pinged the server (192.168.20.10) from PC1.",
          "Opened http://192.168.20.10 in the PC1 web browser. The internal page opened."
        ],
        "images": [
          {
            "src": "images/02-03-normal-ipconfig-pc1",
            "alt": "ipconfig output on PC1 with an address from DHCP",
            "caption": "ipconfig on PC1"
          },
          {
            "src": "images/02-04-normal-ping-server",
            "alt": "Successful ping from PC1 to the server",
            "caption": "Ping to the server"
          },
          {
            "src": "images/02-05-normal-browser-web-internal",
            "alt": "The internal web page open in the PC1 browser",
            "caption": "The internal web page"
          }
        ]
      },
      {
        "heading": "Ticket TKT-002A: no access to the internal website",
        "ticket": {
          "id": "TKT-002A",
          "status": "Resolved",
          "priority": "Medium",
          "meta": [
            [
              "Reporter",
              "Dewi (fictional)"
            ],
            [
              "Category",
              "Network: default gateway"
            ],
            [
              "Assigned to",
              "Yurida Zani"
            ]
          ],
          "rows": [
            [
              "Symptom",
              "\"I can connect to my colleagues, but the internal website won't open.\""
            ],
            [
              "Impact",
              "PC3 cannot reach the internal server. The other PCs are normal."
            ],
            [
              "Checks",
              [
                "Ran ipconfig on PC3: the default gateway was 192.168.10.254.",
                "Pinged the router (192.168.10.1): it worked. Pinged the server (192.168.20.10): it failed."
              ],
              "ordered"
            ],
            [
              "Root cause",
              "The default gateway on PC3 was wrong. A working ping to the router and a failing ping to the server points at the gateway."
            ],
            [
              "Resolution",
              "Changed the gateway on PC3 to 192.168.10.1. Switching PC3 to DHCP would also work."
            ],
            [
              "Verification",
              "After the fix, ipconfig showed the right gateway and the ping to the server succeeded."
            ],
            [
              "Prevention",
              "Check the gateway whenever a static IP is used, and use DHCP where possible."
            ],
            [
              "Lab note",
              "I created this fault on purpose: PC3 got the static address 192.168.10.50/24 with the gateway 192.168.10.254."
            ]
          ]
        },
        "images": [
          {
            "src": "images/02-06-masalah1-ipconfig-gateway-salah",
            "alt": "ipconfig on PC3 showing the wrong default gateway",
            "caption": "ipconfig on PC3: wrong gateway"
          },
          {
            "src": "images/02-07-masalah1-ping-gagal",
            "alt": "Ping from PC3 succeeding to the router and failing to the server",
            "caption": "Ping to the router works, ping to the server fails"
          },
          {
            "src": "images/02-08-masalah1-sesudah-perbaikan",
            "alt": "ipconfig and ping on PC3 after the gateway was fixed",
            "caption": "After the fix"
          }
        ]
      },
      {
        "heading": "Ticket TKT-002B: computer has no connection",
        "ticket": {
          "id": "TKT-002B",
          "status": "Resolved",
          "priority": "Medium",
          "meta": [
            [
              "Reporter",
              "Dedi (fictional)"
            ],
            [
              "Category",
              "Network: DHCP"
            ],
            [
              "Assigned to",
              "Yurida Zani"
            ]
          ],
          "rows": [
            [
              "Symptom",
              "\"My computer has no connection.\""
            ],
            [
              "Impact",
              "PC4 cannot reach the network. The other PCs are normal."
            ],
            [
              "Checks",
              [
                "IP Configuration on PC4 showed \"DHCP request failed\" and an empty IPv4 address.",
                "ipconfig on PC4 showed an address starting with 169.254 (APIPA, the address a PC gives itself when it cannot get one).",
                "show ip dhcp pool on the router listed the pool KANTOR."
              ],
              "ordered"
            ],
            [
              "Root cause",
              "The range 192.168.10.11 to 192.168.10.254 had been added as an excluded address, so the router had no addresses left to hand out. I confirmed it because DHCP worked again once the exclusion was removed."
            ],
            [
              "Resolution",
              "Removed the exclusion with \"no ip dhcp excluded-address 192.168.10.11 192.168.10.254\", saved with \"write memory\", and had PC4 ask for DHCP again."
            ],
            [
              "Verification",
              "PC4 received an address in 192.168.10.x."
            ],
            [
              "Prevention",
              "Document the IP allocation, keep enough addresses in the DHCP range, and review DHCP exclusions before saving the configuration."
            ],
            [
              "Lab note",
              "I created this fault on purpose by excluding that whole range."
            ]
          ]
        },
        "images": [
          {
            "src": "images/02-09-masalah2-ipconfig-169254",
            "alt": "ipconfig on PC4 showing an address starting with 169.254",
            "caption": "ipconfig on PC4: 169.254.x.x"
          },
          {
            "src": "images/02-10-masalah2-show-dhcp-pool",
            "alt": "Router output of show ip dhcp pool",
            "caption": "show ip dhcp pool on the router"
          },
          {
            "src": "images/02-11-masalah2-sesudah-perbaikan",
            "alt": "ipconfig on PC4 showing a 192.168.10.x address after the fix",
            "caption": "PC4 after the fix"
          }
        ]
      },
      {
        "heading": "A problem I hit while building the lab",
        "text": [
          "When I first tested, PC1 could not ping the server (timeout), even though the ping to the router worked. I checked in order: the PC, the router, then the server. The server's gateway had been typed into the DNS Server field, which left the Default Gateway field empty. After I moved it to the right field, the ping worked. I have no screenshot of the state before this fix."
        ]
      },
      {
        "heading": "Notes",
        "text": [
          "A simulated scenario in Cisco Packet Tracer, with a fictional company and fictional people. It is practice, not a real incident."
        ]
      }
    ]
  },
  {
    "id": "network-diagnostics",
    "code": "NET-01",
    "title": "Checking a small office network",
    "category": "Networking",
    "status": "Course lab",
    "tools": [
      "speedtest.net",
      "ipconfig",
      "ping",
      "Windows Troubleshooter"
    ],
    "summary": "A step-by-step way to check whether a small office or home network is healthy, practiced in a guided lab.",
    "sections": [
      {
        "heading": "Scenario",
        "text": [
          "This was a guided lab in a virtual Windows environment, part of the IBM Technical Support Case Studies and Capstone course on Coursera. The goal was to work out whether a small office or home (SOHO) network connection is healthy, using built-in tools and one website.",
          "The gateway address I saw belonged to the lab's virtual machine, so this was not a real office network."
        ]
      },
      {
        "heading": "Approach",
        "ordered": true,
        "list": [
          "Run a speed test to see download speed, upload speed, and ping (latency).",
          "Open Command Prompt and run ipconfig to find the default gateway, which is the router's address.",
          "Ping the default gateway. If all four packets come back, the machine can reach the router.",
          "If something still looks off, run the Windows Internet Connections troubleshooter, either for the general connection or for one specific web page."
        ],
        "images": [
          {
            "src": "images/net-01-speedtest.jpeg",
            "alt": "Speed test result showing download speed, upload speed, and ping",
            "caption": "Speed test result"
          },
          {
            "src": "images/net-01-ipconfig.png",
            "alt": "Command Prompt showing ipconfig output with the default gateway",
            "caption": "Finding the default gateway with ipconfig"
          },
          {
            "src": "images/net-01-ping.png",
            "alt": "Command Prompt showing the result of pinging the default gateway",
            "caption": "Pinging the default gateway"
          },
          {
            "src": "images/net-01-troubleshooter.png",
            "alt": "Windows Internet Connections troubleshooter result",
            "caption": "Windows troubleshooter result"
          }
        ]
      },
      {
        "heading": "What each tool tells me",
        "list": [
          "Speed test: how fast data moves, and how long a small packet takes to go there and back.",
          "ipconfig: the machine's IP setup, including the default gateway.",
          "ping: whether another device is reachable, plus latency and packet loss.",
          "Troubleshooter: an automatic check that can show whether the problem is the connection or one website."
        ]
      },
      {
        "heading": "Takeaway",
        "text": [
          "Start with quick, simple checks and only go deeper when needed. The course teaches the same order for routers: reboot and check cables first, then diagnostics, security scans, and firmware updates."
        ]
      },
      {
        "heading": "Source and notes",
        "text": [
          "Written in my own words from my course notes. Done in a temporary lab environment, not on a real network."
        ]
      }
    ]
  },
  {
    "id": "printer-troubleshooting",
    "code": "HW-01",
    "title": "Printer not printing: a troubleshooting order",
    "category": "Hardware",
    "status": "Course lab",
    "tools": [
      "Windows Settings",
      "Device Manager",
      "Print Spooler"
    ],
    "summary": "A fixed order of checks for printer connectivity problems, plus a lab where I installed a printer and swapped its driver.",
    "sections": [
      {
        "heading": "Scenario",
        "text": [
          "A user says they can't print. Printers connect in several ways (USB, Ethernet, Wi-Fi, Bluetooth, NFC), so the first job is to avoid guessing and work from the simplest cause to the hardest.",
          "In a guided lab I added a local printer with a generic driver, then updated and swapped the driver through Device Manager and the printer's properties."
        ]
      },
      {
        "heading": "Order of checks",
        "ordered": true,
        "list": [
          "Physical connection: cables, power, and whether the printer is on.",
          "Printer settings: is it the default printer, is a job paused, are paper size or quality settings wrong?",
          "Print Spooler: restart the Windows service that manages the print queue.",
          "Firewall or antivirus: turn it off briefly to see if it blocks the printer, then adjust its rules instead of leaving it off.",
          "Print queue: cancel jobs that are stuck.",
          "Network printers only: check the printer's IP address, ping it, and make sure the computer and printer are on the same subnet.",
          "Last resort: remove the printer and reinstall it with the manufacturer's driver."
        ],
        "images": [
          {
            "src": "images/hw-01-print-spooler.png",
            "alt": "Services window showing the Print Spooler service",
            "caption": "The Print Spooler service"
          }
        ]
      },
      {
        "heading": "What I practiced in the lab",
        "list": [
          "Finding Printers & scanners in Windows Settings.",
          "Adding a local printer manually with an existing port and a generic driver.",
          "Checking for a driver update in Device Manager.",
          "Switching to a different driver from the printer's properties."
        ],
        "images": [
          {
            "src": "images/hw-01-printers-scanners.png",
            "alt": "Windows Settings, Printers & scanners page",
            "caption": "Printers & scanners in Windows Settings"
          },
          {
            "src": "images/hw-01-generic-driver.png",
            "alt": "Driver selection screen with the Generic manufacturer",
            "caption": "Choosing a generic driver"
          },
          {
            "src": "images/hw-01-device-manager.png",
            "alt": "Device Manager showing the Update driver option for a print queue",
            "caption": "Updating the driver in Device Manager"
          }
        ]
      },
      {
        "heading": "Takeaway",
        "text": [
          "It is the same pattern as other hardware problems: physical first, then settings, then software, then network, and reinstall last."
        ]
      },
      {
        "heading": "Source and notes",
        "text": [
          "Written in my own words from my notes on the IBM Technical Support Case Studies and Capstone course (Coursera). The lab used a temporary virtual environment, so there was no physical printer."
        ]
      }
    ]
  },
  {
    "id": "monitor-no-display",
    "code": "HW-02",
    "title": "Monitor shows nothing: isolating the cause",
    "category": "Hardware",
    "status": "Course scenario",
    "tools": [
      "Basic hardware checks"
    ],
    "summary": "How to narrow down a vague \"my monitor doesn't work\" call, from clarifying the symptom to swapping parts.",
    "sections": [
      {
        "heading": "Scenario",
        "text": [
          "A course practice scenario: a user phones tech support and says their monitor \"doesn't work\". I wrote this walk-through to practice the order of questions and checks. It is a walk-through, not a real incident."
        ]
      },
      {
        "heading": "Approach",
        "ordered": true,
        "list": [
          "Clarify the complaint first. Ask what exactly they see: nothing at all, a picture that looks wrong, a black screen. \"Doesn't work\" can mean many things.",
          "Check the basics: is the monitor really off or just dim? Raise the brightness and restart the computer.",
          "Check the cable: re-seat both ends, try another port if there is one, and confirm the cable type matches the ports.",
          "Isolate the cause: connect another computer to the monitor, and another monitor to the computer. If the problem follows one device, that device is the cause.",
          "Check the monitor's menu to make sure the input source is correct."
        ]
      },
      {
        "heading": "Takeaway",
        "text": [
          "Order matters: power, then cable, then settings, then isolation by swapping one thing at a time. Change one variable and see whether the problem moves. Driver and OS-level problems come later."
        ]
      },
      {
        "heading": "Source and notes",
        "text": [
          "Based on a practice scenario from the IBM Technical Support Case Studies and Capstone course (Coursera), retold in my own words."
        ]
      }
    ]
  },
  {
    "id": "windows-upgrade-check",
    "code": "OS-01",
    "title": "Before upgrading Windows: checking readiness",
    "category": "Operating systems",
    "status": "Course lab",
    "tools": [
      "Windows Settings",
      "Windows Update",
      "services.msc"
    ],
    "summary": "Checking whether a PC is ready for an OS upgrade and making sure updates install automatically.",
    "sections": [
      {
        "heading": "Scenario",
        "text": [
          "In a guided lab I checked what a Windows machine had and whether its updates were current, the way I would before an upgrade."
        ]
      },
      {
        "heading": "Checks",
        "ordered": true,
        "list": [
          "Open Settings, System, About to read the processor, RAM, system type, and the Windows edition and version.",
          "Open Storage to see how much disk space is free.",
          "Compare these against the new version's minimum requirements, including space for temporary installation files.",
          "Back up important data first, because an upgrade can fail.",
          "Run Check for updates in Windows Update and note which updates are pending install or pending restart.",
          "Set the Windows Update service to Automatic in services.msc so updates install without manual steps."
        ],
        "images": [
          {
            "src": "images/os-01-about.png",
            "alt": "Settings, System, About page showing device and Windows specifications",
            "caption": "Checking specifications in Settings"
          },
          {
            "src": "images/os-01-storage.png",
            "alt": "Settings, System, Storage page",
            "caption": "Checking free disk space"
          },
          {
            "src": "images/os-01-windows-update.png",
            "alt": "Windows Update page",
            "caption": "Windows Update status"
          },
          {
            "src": "images/os-01-services.png",
            "alt": "Properties of the Windows Update service showing the startup type",
            "caption": "Windows Update service startup type"
          }
        ]
      },
      {
        "heading": "Other things I learned",
        "list": [
          "Why upgrade: performance, security, compatibility, and new features.",
          "Ways to install an OS: DVD, bootable USB, network boot (PXE), image deployment, and automatic updates.",
          "SSDs are faster than HDDs for installs because they have no moving parts."
        ]
      },
      {
        "heading": "Takeaway",
        "text": [
          "Know the machine's specs and free space before changing anything, and keep a backup. On a real machine, leave it on until updates finish, then restart."
        ]
      },
      {
        "heading": "Source and notes",
        "text": [
          "Written in my own words from my notes on the IBM Technical Support Case Studies and Capstone course (Coursera). Done in a temporary lab environment."
        ]
      }
    ]
  }
];
