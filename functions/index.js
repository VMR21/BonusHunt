<script type="text/plain" data-filename="functions/index.js">import functions from "firebase-functions";
const b = bSnap.val();
const openedAt = now();
const numericWin = num(win, 0);
const updated = { ...b, win: numericWin, openedAt, multi: b.bet > 0 ? +(numericWin / b.bet).toFixed(2) : null };


const updates = {};
updates[`${path}/bonuses/${bonusId}`] = updated;
updates[`${path}/updatedAt`] = openedAt;


// auto-advance if this is current
let { currentIndex = 0, order = [], status } = hunt;
if (status === 'opening' && order[currentIndex] === bonusId) {
const nextIndex = currentIndex + 1;
if (nextIndex < order.length) {
updates[`${path}/currentIndex`] = nextIndex;
} else {
updates[`${path}/currentIndex`] = nextIndex; // past last
updates[`${path}/status`] = 'finished';
}
}
await db.ref().update(updates);
res.json({ ok: true, bonus: updated });
} catch (e) { res.status(500).json({ error: e.message }); }
});


app.post('/updateSpent', requireKey, async (req, res) => {
try { const { huntId, spent } = req.body || {};
if (!huntId) return res.status(400).json({ error: 'huntId required' });
await db.ref(`/hunts/${huntId}`).update({ spent: num(spent, 0), updatedAt: now() });
res.json({ ok: true });
} catch (e) { res.status(500).json({ error: e.message }); }
});


// ===== Public routes =====
app.get('/hunts', async (_req, res) => {
const snap = await db.ref('/hunts').get();
const hunts = snap.exists() ? Object.values(snap.val()) : [];
hunts.sort((a, b) => b.createdAt - a.createdAt);
res.json({ hunts });
});
app.get('/hunt/:id', async (req, res) => {
const { id } = req.params;
const s = await db.ref(`/hunts/${id}`).get();
if (!s.exists()) return res.status(404).json({ error: 'not found' });
res.json({ hunt: s.val() });
});
app.get('/active', async (_req, res) => {
const id = (await db.ref('/activeHuntId').get()).val();
if (!id) return res.json({ active: null });
const s = await db.ref(`/hunts/${id}`).get();
res.json({ active: s.val() });
});


export const api = functions.https.onRequest(app);
</script>
