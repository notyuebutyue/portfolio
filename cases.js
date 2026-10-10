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
