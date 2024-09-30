# Deltamon

![Deltamon Screenshot](https://i.ibb.co/khLgnGt/Screenshot-2024-09-30-at-19-37-30.png)

Deltamon is a turn-based RPG card game where players select creatures, position them on a board, and use abilities to battle based on initiative. The game features mechanics such as skill selection, HP management, buffs/debuffs, and elemental effects like fire and ice, with both active and passive abilities influencing gameplay. The most fun part - creatures evolve.

# Dex

Full list of image concepts for creatures can be found [here](https://savonarolalabs.github.io/deltamon/dex).

# Mechanics

<h1>Creatures</h1>

<h2>Action Types</h2>
<table border="1" cellpadding="5" cellspacing="0">
  <tr>
    <th>Action</th>
    <th>Targets</th>
    <th>Range</th>
    <th>Additional</th>
    <th>Type</th>
  </tr>
  <tr><td>Bite</td><td>Solo Target</td><td>Melee</td><td>None</td><td>Physical</td></tr>
  <tr><td>Dagger Throw</td><td>Solo Target</td><td>Range</td><td>None</td><td>Physical</td></tr>
  <tr><td>Spear Throw</td><td>Row Target</td><td>Range</td><td>None</td><td>Physical</td></tr>
  <tr><td>Charge</td><td>Row Target</td><td>Melee</td><td>None</td><td>Physical</td></tr>
  <tr><td>Cleave</td><td>Column Target</td><td>Melee</td><td>None</td><td>Physical</td></tr>
  <tr><td>Rain of Arrows</td><td>Column Target</td><td>Range</td><td>None</td><td>Physical</td></tr>
  <tr><td>Ground Slam</td><td>All Enemies</td><td>Melee</td><td>None</td><td>Physical</td></tr>
  <tr><td>Grenade Throw</td><td>All Enemies</td><td>Range</td><td>None</td><td>Physical</td></tr>
  <tr><td>Nuke Bomb</td><td>All</td><td>Range</td><td>None</td><td>Physical</td></tr>
  <tr><td>Drunken Thrower</td><td>Random Enemy</td><td>Range</td><td>None</td><td>Physical</td></tr>
  <tr><td>Drunken Brawler</td><td>Random Enemy</td><td>Melee</td><td>None</td><td>Physical</td></tr>
  <tr><td>God's Finger</td><td>Random</td><td>Range</td><td>None</td><td>Physical</td></tr>
</table>

<h2>Buffs</h2>
<table border="1" cellpadding="5" cellspacing="0">
  <tr><th>Buff</th><th>Description</th></tr>
  <tr><td>Damage Buff</td><td>Increases damage dealt</td></tr>
  <tr><td>Resist Buff</td><td>Increases resistance to damage</td></tr>
  <tr><td>Damage Block</td><td>Blocks a portion of incoming damage</td></tr>
  <tr><td>Additional Attack</td><td>Grants an additional attack</td></tr>
  <tr><td>XP / Heal / Heal Increase</td><td>Increases experience gained, heals, or increases healing</td></tr>
  <tr><td>Mana / Mana Regen / Mana Increase</td><td>Increases mana, mana regeneration, or mana capacity</td></tr>
  <tr><td>Accuracy</td><td>Increases accuracy</td></tr>
  <tr><td>Evasion</td><td>Increases evasion</td></tr>
  <tr><td>Remove Debuffs</td><td>Removes existing debuffs</td></tr>
</table>

<h2>Debuffs</h2>
<table border="1" cellpadding="5" cellspacing="0">
  <tr><th>Debuff</th><th>Description</th></tr>
  <tr><td>Damage Reduction</td><td>Reduces damage dealt</td></tr>
  <tr><td>Resist Reduction</td><td>Reduces resistance to damage</td></tr>
  <tr><td>Damage Amplification</td><td>Increases damage taken</td></tr>
  <tr><td>Movement</td><td>Affects movement</td></tr>
  <tr><td>Skip Turn</td><td>Forces the target to skip a turn</td></tr>
  <tr><td>Accuracy Loss</td><td>Reduces accuracy</td></tr>
  <tr><td>Silence</td><td>Prevents ability use</td></tr>
  <tr><td>Disarm</td><td>Prevents weapon use</td></tr>
  <tr><td>Additional Damage Instances</td><td>Adds extra damage instances</td></tr>
  <tr><td>XP/Mana/Regen Reduction</td><td>Reduces experience, mana, or regeneration</td></tr>
  <tr><td>Antibuffs</td><td>Counters buffs</td></tr>
</table>

<h2>Buffs/Debuffs Attributes</h2>
<table border="1" cellpadding="5" cellspacing="0">
  <tr><th>Buffs/Debuffs Attributes</th><th></th><th></th><th></th><th></th><th></th><th></th></tr>
  <tr><th>Dispel Power</th><th>Activations</th><th>Duration</th><th>Scope</th><th>Targets</th><th>Power</th><th>Stackable</th></tr>
  <tr><td>None</td><td>Turn start</td><td>Turns</td><td>All Buffs</td><td>Main and Additional</td><td>Absolute</td><td>None</td></tr>
  <tr><td>Strong</td><td>Turn End</td><td>Actions</td><td>All Debuffs</td><td>Main targets</td><td>Percentage</td><td>Effect and Duration</td></tr>
  <tr><td>Weak</td><td>Self Start</td><td>Incoming Instances</td><td>Special Buff Types</td><td>Additional Targets</td><td></td><td></td></tr>
  <tr><td></td><td>Self End</td><td>Outgoing Instances</td><td>Special Debuff Types</td><td></td><td></td><td></td></tr>
  <tr><td></td><td>Target Creature Start</td><td></td><td></td><td></td><td></td><td></td></tr>
  <tr><td></td><td>Target Creature End</td><td></td><td></td><td></td><td></td><td></td></tr>
  <tr><td></td><td>Each Creature Start</td><td></td><td></td><td></td><td></td><td></td></tr>
  <tr><td></td><td>Each Creature End</td><td></td><td></td><td></td><td></td><td></td></tr>
</table>

# Abilities
