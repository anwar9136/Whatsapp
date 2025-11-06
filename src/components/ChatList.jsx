import React, { useMemo, useState, useEffect, useRef } from "react";
import { Plus, MoreVertical, Search, LogOut } from "lucide-react";

export default function ChatList({ chats, activeId, onSelect, onLogout }) {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return chats;
    return chats.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.lastMessage || "").toLowerCase().includes(q)
    );
  }, [chats, query]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const handleLogout = () => {
    if (typeof onLogout === "function") onLogout();
    setMenuOpen(false);
  };

  return (
    <div className="h-full flex flex-col gap-5 bg-(--color-panel) text-textPrimary">
      {/* Header */}
      <div className="px-5 h-[70px] flex items-center justify-between border-b border-(--color-border)">
        <div
          className="font-bold text-[35px] tracking-tight"
          style={{ marginLeft: "17px" }}
        >
          WhatsApp
        </div>

        <div className="flex items-center gap-2 text-textSecondary">
          {/* Plus (New Chat) Icon */}
          <button
            title="New chat"
            className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200"
            style={{
              cursor: "pointer",
              color: "#b9b9b9",
              borderRadius: "50%",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.12)";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#b9b9b9";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <Plus size={22} />
          </button>

          {/* Menu Icon */}
          <div className="relative" ref={menuRef}>
            <button
              title="Menu"
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200"
              style={{
                cursor: "pointer",
                color: "#b9b9b9",
                borderRadius: "50%",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#b9b9b9";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <MoreVertical size={22} />
            </button>

            {menuOpen && (
              <div
                className="absolute right-0 top-12 w-56 bg-[#233138] rounded-xl shadow-xl py-1 z-50"
                style={{ padding: "10px" }}
              >
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-5 py-3 text-white transition-all rounded-full"
                  style={{
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    borderRadius: "50px",
                    transition: "all 0.25s ease",
                    color: "#b9b9b9",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255,0,0,0.15)";
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.transform = "scale(1.03)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#b9b9b9";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <LogOut size={18} />
                  <span className="text-[15px] font-medium">Log out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 pt-4 pb-3">
        <div
          className="flex items-center gap-3 rounded-3xl bg-(--color-inputBg) px-4 py-2.5 h-[45px] text-textSecondary"
          style={{
            marginLeft: "10px",
            marginRight: "10px",
            border: "1px solid transparent",
            transition: "border 0.25s ease, box-shadow 0.25s ease",
            borderRadius: "25px",
          }}
          onFocus={(e) => {
            e.currentTarget.style.border = "1px solid #00a884";
            e.currentTarget.style.boxShadow = "0 0 0 1px #00a884";
          }}
          onBlur={(e) => {
            e.currentTarget.style.border = "1px solid transparent";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <Search
            size={16}
            className="ml-1"
            style={{ marginLeft: "20px", color: "#b9b9b9" }}
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search or start a new chat"
            className="bg-transparent outline-none text-[14.2px] flex-1 text-textPrimary placeholder:text-textSecondary"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-3 pb-3">
        <div
          className="space-y-3"
          style={{ paddingLeft: "10px", paddingRight: "10px" }}
        >
          {filtered.map((c) => {
            const active = c.id === activeId;
            return (
              <div
                key={c.id}
                onClick={() => onSelect(c.id)}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl cursor-pointer transition-all duration-200 ${
                  active
                    ? "bg-[rgba(255,255,255,0.08)]"
                    : "hover:bg-[rgba(255,255,255,0.04)]"
                }`}
                style={{
                  marginBottom: "6px",
                  padding: "10px",
                }}
              >
                {/* Avatar */}
                <div className="w-[54px] h-[54px] rounded-full bg-(--color-border) flex items-center justify-center text-[18px] font-medium shrink-0">
                  {c.avatar}
                </div>

                {/* Chat Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between mb-[4px]">
                    <div className="font-medium text-[16.8px] truncate">
                      {c.name}
                    </div>
                    <div className="text-[12px] text-textSecondary shrink-0">
                      {c.time || ""}
                    </div>
                  </div>
                  <div className="text-[14px] text-textSecondary truncate leading-[20px]">
                    {c.lastMessage}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
