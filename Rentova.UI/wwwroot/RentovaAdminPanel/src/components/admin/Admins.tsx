import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Trash2 } from 'lucide-react';
import { Admin } from '../../types';

interface AdminsProps {
  admins: Admin[];
  setAdmins: (admins: Admin[]) => void;
  newAdminEmail: string;
  setNewAdminEmail: (val: string) => void;
  newAdminPassword: string;
  setNewAdminPassword: (val: string) => void;
}

const Admins: React.FC<AdminsProps> = ({
  admins,
  setAdmins,
  newAdminEmail,
  setNewAdminEmail,
  newAdminPassword,
  setNewAdminPassword
}) => {
  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto bg-zinc-950 border border-zinc-800 rounded-[3rem] p-12"
      >
        <div className="flex items-center gap-6 mb-12">
          <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
            <ShieldAlert size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-display font-black text-white">Yeni Admin Ekle</h2>
            <p className="text-zinc-500 text-sm">Sisteme yeni bir yönetici tanımlayın.</p>
          </div>
        </div>

        <form className="space-y-8" onSubmit={(e) => {
          e.preventDefault();
          if (newAdminEmail && newAdminPassword) {
            setAdmins([...admins, { email: newAdminEmail, password: newAdminPassword }]);
            setNewAdminEmail('');
            setNewAdminPassword('');
          }
        }}>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-4">E-POSTA ADRESİ</label>
            <input 
              type="email" 
              value={newAdminEmail}
              onChange={(e) => setNewAdminEmail(e.target.value)}
              placeholder="admin@rentova.com" 
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 px-6 text-sm text-white outline-none focus:border-emerald-500 transition-all" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-4">ŞİFRE</label>
            <input 
              type="password" 
              value={newAdminPassword}
              onChange={(e) => setNewAdminPassword(e.target.value)}
              placeholder="••••••••" 
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 px-6 text-sm text-white outline-none focus:border-emerald-500 transition-all" 
            />
          </div>

          <div className="pt-8">
            <button type="submit" className="w-full py-5 bg-emerald-500 text-black rounded-2xl text-sm font-black hover:bg-emerald-400 transition-all shadow-2xl shadow-emerald-500/20">Admini Kaydet</button>
          </div>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-950 border border-zinc-800 rounded-[3rem] overflow-hidden"
      >
        <div className="p-8 border-b border-zinc-800">
          <h3 className="text-xl font-display font-bold text-white">Mevcut Adminler</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-800/50">
                <th className="px-8 py-6">E-posta</th>
                <th className="px-8 py-6">Şifre</th>
                <th className="px-8 py-6 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {admins.map((admin, idx) => (
                <tr key={idx} className="border-b border-zinc-800/30 hover:bg-zinc-900/30 transition-colors">
                  <td className="px-8 py-6 font-bold text-white">{admin.email}</td>
                  <td className="px-8 py-6 text-zinc-500 font-mono text-xs">{admin.password}</td>
                  <td className="px-8 py-6 text-right">
                    <button 
                      onClick={() => setAdmins(admins.filter((_, i) => i !== idx))}
                      className="p-2 text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Admins;
