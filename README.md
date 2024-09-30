# Deltamon

Deltamon is a turn-based RPG card game where players select creatures, position them on a board, and use abilities to battle based on initiative. The game features mechanics such as skill selection, HP management, buffs/debuffs, and elemental effects like fire and ice, with both active and passive abilities influencing gameplay. The most fun part - creatures evolve.

# WebGl game concept

![WebGl Screenshot](https://i.ibb.co/M7W6RDj/Screenshot-2024-09-30-at-19-57-43.png)
https://savonarolalabs.github.io/deltamon/pvp

-   Press Q W E A S D to throw spells

# Old Gameploop concept

https://savonarolalabs.github.io/deltamon/pvp

-   Press A to attack then click on the target creature

# Dex

![Deltamon Screenshot](https://i.ibb.co/khLgnGt/Screenshot-2024-09-30-at-19-37-30.png)
Full list of image concepts for creatures can be found [here](https://savonarolalabs.github.io/deltamon/dex).

<h1>Mechanics</h1>

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

<h1>Creatures</h1>

<table border="1" cellpadding="5" cellspacing="0">

<tr><td>1</td><td>Fire</td><td>Beast</td><td>Roar, Claws Sweep</td><td>Meele</td><td>Fighter</td><td>Bruiser</td><td>Attack
</td></tr>
<tr><td>2</td><td>Nature</td><td>Beast</td><td>Heal</td><td>Meele</td><td>Mage</td><td>Buffer</td><td>Defensive
</td></tr>
<tr><td>3</td><td>Nature</td><td>Beast</td><td>Retaliation, toxic aura</td><td>Meele</td><td>Fighter</td><td>Bruiser</td><td>Attack
</td></tr>
<tr><td>4</td><td>Nature</td><td>Beast</td><td>Spore throw, Spore cloud</td><td>Meele</td><td>Fighter</td><td>Bruiser</td><td>Attack
</td></tr>
<tr><td>5</td><td>Light, Nature</td><td>Spirit</td><td>Bliding light, Guiding Light</td><td>Range</td><td>Mage</td><td>Buffer</td><td>Balance
</td></tr>
<tr><td>6</td><td>Light</td><td>Spirit</td><td>Mass Heal</td><td>Range</td><td>Mage</td><td>Buffer</td><td>Balance
</td></tr>
<tr><td>7</td><td>Dark</td><td>Beast</td><td>Punch</td><td>Meele</td><td>Fighter</td><td>Durability</td><td>Balance
</td></tr>
<tr><td>8</td><td>Dark</td><td>Beast</td><td>Punch, shadow strike</td><td>Meele</td><td>Fighter</td><td>Bruiser</td><td>Balance
</td></tr>
<tr><td>9</td><td>Metal</td><td>Golem</td><td>Punch, Retalitaion, Spiked bullets, Charge</td><td>Meele</td><td>Fighter</td><td>Durability</td><td>Balance
</td></tr>
<tr><td>10</td><td>Earth, Light</td><td>Elemental</td><td>Fortify, Shine </td><td>Meele</td><td>Fighter</td><td>Durability</td><td>Defensive
</td></tr>
<tr><td>11</td><td>Nature</td><td>Beast</td><td>Regeneration</td><td>Meele</td><td>Fighter</td><td>Durability</td><td>Balance
</td></tr>
<tr><td>12</td><td>Metal</td><td>Golem</td><td>Retaliation, Bleeding strike</td><td>Meele</td><td>Fighter</td><td>Bruiser</td><td>Defensive
</td></tr>
<tr><td>13</td><td>Metal</td><td>Golem</td><td>Bleeding strike, Thousand cuts, blade dance</td><td>Meele</td><td>Fighter</td><td>Bruiser</td><td>Balance
</td></tr>
<tr><td>14</td><td>Metal</td><td>Golem</td><td>Retaliation, Bleeding strike</td><td>Meele</td><td>Fighter</td><td>Bruiser</td><td>Balance
</td></tr>
<tr><td>15</td><td>Metal</td><td>Golem</td><td>Blade dance, Rain of blades</td><td>Meele</td><td>Mage</td><td>Damage</td><td>Balance
</td></tr>
<tr><td>16</td><td>Metal</td><td>Golem</td><td>Glass Canon, Armor penetration, Deep cut</td><td>Meele</td><td>Fighter</td><td>Damage</td><td>Balance
</td></tr>
<tr><td>17</td><td>Dark</td><td>Beast</td><td>Demonic presence</td><td>Meele</td><td>Fighter</td><td>Damage</td><td>Attack
</td></tr>
<tr><td>18</td><td>Earth, Fire</td><td>Elemental</td><td>Meteors, Fire rocks</td><td>Meele</td><td>Mage</td><td>Durability</td><td>Defensive
</td></tr>
<tr><td>19</td><td>Nature</td><td>Beast</td><td>Retaliation</td><td>Meele</td><td>Fighter</td><td>Durability</td><td>Defensive
</td></tr>
<tr><td>20</td><td>Dark</td><td>Ghost</td><td>Fear</td><td>Meele</td><td>Fighter</td><td>Damage</td><td>Attack
</td></tr>
<tr><td>21</td><td>Light</td><td>Ghost</td><td>Hypnotic eyes, Strings of constraints</td><td>Meele</td><td>Mage</td><td>Debuffs</td><td>Defensive
</td></tr>
<tr><td>22</td><td>Light</td><td>Beast</td><td>Defensive stance, Protect the ally</td><td>Meele</td><td>Fighter</td><td>Durability</td><td>Balance
</td></tr>
<tr><td>23</td><td>Nature, Earth</td><td>Beast</td><td>Charge, Dodge</td><td>Meele</td><td>Fighter</td><td>Bruiser</td><td>Defensive
</td></tr>
<tr><td>24</td><td>Nature</td><td>Spirit</td><td>Corossion, corrosive ball</td><td>Range</td><td>Mage</td><td>Debuffs</td><td>Attack
</td></tr>
<tr><td>25</td><td>Air</td><td>Spirit</td><td>Sleep, wind blades, wind shield</td><td>Range</td><td>Mage</td><td>Debuffs</td><td>Balance
</td></tr>
<tr><td>26</td><td>Ice</td><td>Beast</td><td>Dragon Breath, Charge</td><td>Meele</td><td>Fighter</td><td>Bruisier</td><td>Balance
</td></tr>
<tr><td>27</td><td>Nature</td><td>Golem</td><td>Swift attack, Dodge</td><td>Meele</td><td>Fighter</td><td>Bruisier</td><td>Balance
</td></tr>
<tr><td>28</td><td>Ice</td><td>Elemental</td><td>Frostbite, Frost nova, Chilling aura</td><td>Range</td><td>Mage</td><td>Control</td><td>Balance
</td></tr>
<tr><td>29</td><td>Light</td><td>Spirit</td><td>Heal, Healing Aura</td><td>Range</td><td>Mage</td><td>Buffer</td><td>Defensive
</td></tr>
<tr><td>30</td><td>Fire</td><td>Spirit</td><td>Inner Fire, Fire Burst</td><td>Range</td><td>Mage</td><td>Buffer</td><td>Balance
</td></tr>
<tr><td>31</td><td>Nature</td><td>Beast</td><td>Punch, Counter Attack</td><td>Meele</td><td>Fighter</td><td>Bruiser</td><td>Attack
</td></tr>
<tr><td>32</td><td>Nature</td><td>Beast</td><td>Bash strike, regeneration</td><td>Meele</td><td>Fighter</td><td>Bruiser</td><td>Attack
</td></tr>
<tr><td>33</td><td>Metal</td><td>Golem</td><td>Charge</td><td>Meele</td><td>Fighter</td><td>Bruiser</td><td>Balance
</td></tr>
<tr><td>34</td><td>Dark</td><td>Beast</td><td>Corrosive strike, corrosive cloud, corrosive skin</td><td>Meele</td><td>Fighter</td><td>Bruiser</td><td>Attack
</td></tr>
<tr><td>35</td><td>Nature, Earth</td><td>Beast</td><td>Charge</td><td>Meele</td><td>Fighter</td><td>Bruiser</td><td>Defensive
</td></tr>
<tr><td>36</td><td>Nature, Earth</td><td>Beast</td><td>Charge, Toss</td><td>Meele</td><td>Fighter</td><td>Bruiser</td><td>Attack
</td></tr>
<tr><td>37</td><td>Nature</td><td>Beast</td><td>Charge, Strong regeneration</td><td>Meele</td><td>Fighter</td><td>Bruiser</td><td>Attack
</td></tr>
<tr><td>38</td><td>Metal</td><td>Golem</td><td>Charge</td><td>Meele</td><td>Fighter</td><td>Bruiser</td><td>Balance
</td></tr>
<tr><td>39</td><td>Dark</td><td>Ghost</td><td>Fear, Magic strike, Dark impulse</td><td>Range</td><td>Mage</td><td>Damage</td><td>Attack
</td></tr>
<tr><td>40</td><td>Metal</td><td>Beast</td><td>Punch</td><td>Meele</td><td>Fighter</td><td>Bruiser</td><td>Attack
</td></tr>
<tr><td>41</td><td>Ice, Nature</td><td>Beast</td><td>Dodge, Series of punches</td><td>Meele</td><td>Fighter</td><td>Bruiser</td><td>Attack
</td></tr>
<tr><td>42</td><td>Nature</td><td>Beast</td><td>Dodge, Punch</td><td>Meele</td><td>Fighter</td><td>Bruiser</td><td>Balance
</td></tr>
<tr><td>43</td><td>Metal</td><td>Beast</td><td>Punch</td><td>Meele</td><td>Fighter</td><td>Bruiser</td><td>Balance
</td></tr>
<tr><td>44</td><td>Nature</td><td>Beast</td><td>Dragon Breath</td><td>Meele</td><td>Fighter</td><td>Bruiser</td><td>Balance
</td></tr>
<tr><td>45</td><td>Dark</td><td>Beast</td><td>Dark presense, punch</td><td>Meele</td><td>Fighter</td><td>Bruiser</td><td>Attack
</td></tr>
<tr><td>46</td><td>Fire</td><td>Beast</td><td>Fire balls, Burning aura</td><td>Meele</td><td>Mage</td><td>Damage</td><td>Balance
</td></tr>
<tr><td>47</td><td>Metal</td><td>Beast</td><td>Armor plates</td><td>Meele</td><td>Fighter</td><td>Bruiser</td><td>Balance
</td></tr>
<tr><td>48</td><td>Nature</td><td>Beast</td><td>Charge, Nature protection</td><td>Meele</td><td>Fighter</td><td>Durability</td><td>Balance
</td></tr>
<tr><td>49</td><td>Nature</td><td>Beast</td><td>Dodge, Hunters eyes, Leap</td><td>Meele</td><td>Fighter</td><td>Damage</td><td>Balance
</td></tr>
<tr><td>50</td><td>Nature</td><td>Beast</td><td>Air strike, Hunters eyes, Antimagic</td><td>Meele</td><td>Fighter</td><td>Damage</td><td>Balance
</td></tr>
<tr><td>51</td><td>Nature</td><td>Beast</td><td>Punch, Charge, Antimagic</td><td>Meele</td><td>Fighter</td><td>Bruiser</td><td>Balance
</td></tr>
<tr><td>52</td><td>Nature, Water</td><td>Beast</td><td>Water Strike, Antimagic, Mana drain</td><td>Range</td><td>Mage</td><td>Buffer</td><td>Balance
</td></tr>
<tr><td>53</td><td>Light</td><td>Spirit</td><td>Mana Shield, Light strike, Light Blast</td><td>Range</td><td>Mage</td><td>Damage</td><td>Balance
</td></tr>
<tr><td>54</td><td>Water</td><td>Beast</td><td>Physical shield, Healing aura,  Mana aura</td><td>Meele</td><td>Mage</td><td>Durability</td><td>Balance
</td></tr>
<tr><td>55</td><td>Nature</td><td>Beast</td><td>Punch, Entangled</td><td>Meele</td><td>Fighter</td><td>Durability</td><td>Defensive
</td></tr>
<tr><td>56</td><td>Metal, Earth</td><td>Golem</td><td>Punch, Physical shield, Earth strike</td><td>Meele</td><td>Fighter</td><td>Durability</td><td>Defensive
</td></tr>
<tr><td>57</td><td>Fire, Earth</td><td>Elemental</td><td>Punch, Charge, Overheat</td><td>Meele</td><td>Fighter</td><td>Damage</td><td>Attack
</td></tr>
<tr><td>58</td><td>Fire</td><td>Elemental</td><td>Fire strike, Fire ray, Fire vortex, Inferno</td><td></td><td>Mage</td><td>AOE Damage</td><td>Attack
</td></tr>
<tr><td>59</td><td>Light, Order</td><td>Spirit</td><td>Magic Shield, Mana aura, Magic weakness</td><td>Meele</td><td>Mage</td><td>Buffer</td><td>Balance
</td></tr>
<tr><td>60</td><td>Ice</td><td>Elemental</td><td>Punch, Ice strike, blizzard</td><td>Meele</td><td>Fighter</td><td>Damage</td><td>Attack
</td></tr>
<tr><td>61</td><td>Fire</td><td>Golem</td><td>Claws, fire breath</td><td>Meele</td><td>Fighter</td><td>Damage</td><td>Attack
</td></tr>
<tr><td>62</td><td>Light</td><td>Spirit</td><td>Magic Empower, Mana Shield, Magic strike</td><td>Meele</td><td>Mage</td><td>Debuffs</td><td>Balance
</td></tr>
<tr><td>63</td><td>Electro</td><td>Spirit</td><td>Electiric touch, electric retaliation</td><td>Meele</td><td>Fighter</td><td>Durability</td><td>Defensive
</td></tr>
<tr><td>64</td><td>Light</td><td>Spirit</td><td>Sleep, Health Regen, </td><td>Meele</td><td>Mage</td><td>Debuffs</td><td>Balance
</td></tr>
<tr><td>65</td><td>Metal, Earth</td><td>Golem</td><td>Punch, Charge</td><td>Meele</td><td>Fighter</td><td>Durability</td><td>Defensive
</td></tr>
<tr><td>66</td><td>Fire</td><td>Spirit</td><td>Fire wave, Fire ball, Burning Aura </td><td>Meele</td><td>Mage</td><td>Damage</td><td>Balance
</td></tr>
<tr><td>67</td><td>Water</td><td>Beast</td><td>Punch, Water strike</td><td>Meele</td><td>Fighter</td><td>Durability</td><td>Defensive
</td></tr>
<tr><td>68</td><td>Water</td><td>Beast</td><td>Punch, Water strike, Water wave, Retaliation</td><td>Meele</td><td>Fighter</td><td>Durability</td><td>Defensive
</td></tr>
<tr><td>69</td><td>Electro</td><td>Beast</td><td>Punch, Electric pulse, Electric wave</td><td>Meele</td><td>Fighter</td><td>Damage</td><td>Attack
</td></tr>
<tr><td>70</td><td>Metal</td><td>Spirit</td><td>Punch, Armored Core</td><td>Meele</td><td>Fighter</td><td>Durability</td><td>Defensive
</td></tr>
<tr><td>71</td><td>Fire</td><td>Spirit</td><td>Fire strike, Fire cloack, Fire wave</td><td>Meele</td><td>Fighter</td><td>Damage</td><td>Attack
</td></tr>
<tr><td>72</td><td>Cosmos</td><td>Spirit</td><td>Magic Empower, Dark wave</td><td>Meele</td><td>Mage</td><td>Buffer</td><td>Balance
</td></tr>
<tr><td>73</td><td>Electro</td><td>Spirit</td><td>Electric claws, Electric wave</td><td>Meele</td><td>Fighter</td><td>Damage</td><td>Attack
</td></tr>
<tr><td>74</td><td>Light</td><td>Spirit</td><td>Heal, Mana transfer, Cleance</td><td>Meele</td><td>Mage</td><td>Buffer</td><td>Balance
</td></tr>
<tr><td>75</td><td>Dark, Fire</td><td>Spirit</td><td>Evasion, Dark strike</td><td>Meele</td><td>Fighter</td><td>Damage</td><td>Attack
</td></tr>
<tr><td>76</td><td>Dark</td><td>Spirit</td><td>Dark strike, Charge</td><td>Meele</td><td>Fighter</td><td>Damage</td><td>Attack
</td></tr>
<tr><td>77</td><td>Light</td><td>Spirit</td><td>Tranquility, Healing Aura</td><td>Meele</td><td>Mage</td><td>Buffer</td><td>Balance
</td></tr>
<tr><td>78</td><td>Earth</td><td>Elemental</td><td>Punch, Earth wave, Thousand Punches</td><td>Meele</td><td>Fighter</td><td>Damage</td><td>Attack
</td></tr>
<tr><td>79</td><td>Dark</td><td>Spirit</td><td>Provoke, Trap, Root</td><td>Meele</td><td>Mage</td><td>Control</td><td>Balance
</td></tr>
<tr><td>80</td><td>Water, Dark</td><td>Spirit</td><td>Water Ball, Water wave, Water shield</td><td>Range</td><td>Mage</td><td>Damage</td><td>Balance
</td></tr>
<tr><td>81</td><td>Dark</td><td>Golem</td><td>Punch, Charge, Blinding Immune </td><td>Meele</td><td>Fighter</td><td>Damage</td><td>Attack
</td></tr>
<tr><td>82</td><td>Dark</td><td>Spirit</td><td>Punch, Blinding Immune</td><td>Meele</td><td>Fighter</td><td>Damage</td><td>Balance
</td></tr>
<tr><td>83</td><td>Metal</td><td>Beast</td><td>Punch, Retaliation, Preparation</td><td>Meele</td><td>Fighter</td><td>Bruiser</td><td>Attack
</td></tr>
<tr><td>84</td><td>Dark, Electro</td><td>Spirit</td><td>Punch, Charge, Dark Aura</td><td>Meele</td><td>Fighter</td><td>Damage</td><td>Attack
</td></tr>
<tr><td>85</td><td>Water</td><td>Beast</td><td>Water Strike, Magic Regen, Water Blast</td><td>Range</td><td>Mage</td><td>Damage</td><td>Balance
</td></tr>
<tr><td>86</td><td>Nature, Wind</td><td>Beast</td><td>Punch, Wind strike, Rage</td><td>Meele</td><td>Fighter</td><td>Bruiser</td><td>Attack
</td></tr>
<tr><td>87</td><td>Dark, Electro</td><td>Beast</td><td>Punch, Charge, Electric wave</td><td>Meele</td><td>Fighter</td><td>Damage</td><td>Attack
</td></tr>
<tr><td>88</td><td>Dark</td><td>Ghost</td><td>Dark strike, Water blast, Fire wave</td><td>Range</td><td>Mage</td><td>Damage</td><td>Balance
</td></tr>
<tr><td>89</td><td>Dark</td><td>Ghost</td><td>Dark strike, Electric wave, Dark cloud, Disarm</td><td>Range</td><td>Mage</td><td>Damage</td><td>Balance
</td></tr>
<tr><td>90</td><td>Light</td><td>Spirit</td><td>Heal, Guidance, Blinding light</td><td>Range</td><td>Mage</td><td>Buffer</td><td>Balance
</td></tr>
<tr><td>91</td><td>Light</td><td>Beast</td><td>Tranqulity, Mana Boost, Mana Transfer</td><td>Range</td><td>Mage</td><td>Buffer</td><td>Balance
</td></tr>
<tr><td>92</td><td>Light</td><td>Golem</td><td>Antimagic, magic weakness, Light beam</td><td>Range</td><td>Mage</td><td>Buffer</td><td>Balance
</td></tr>
<tr><td>93</td><td>Water</td><td>Beast</td><td>Water strike, Water Amplification, Water wave</td><td>Range</td><td>Mage</td><td>Damage</td><td>Balance
</td></tr>
<tr><td>94</td><td>Electro</td><td>Elemental</td><td>Energy strike, Static electiricity, Energy ray</td><td>Range</td><td>Mage</td><td>Damage</td><td>Attack
</td></tr>
<tr><td>95</td><td>Earth, Metal</td><td>Beast</td><td>Punch, Charge, Guardian</td><td>Meele</td><td>Fighter</td><td>Durability</td><td>Defensive
</td></tr>
<tr><td>96</td><td>Dark</td><td>Spirit</td><td>Mana drain, mana vacum, fire wave</td><td>Range</td><td>Mage</td><td>Damage</td><td>Balance
</td></tr>
<tr><td>97</td><td>Light</td><td>Spirit</td><td>Mana shield, Mana Amplification, Light strike</td><td>Range</td><td>Mage</td><td>Buffer</td><td>Balance
</td></tr>
<tr><td>98</td><td>Earth, Metal</td><td>Beast</td><td>Punch, Deep cut, Charge</td><td>Meele</td><td>Fighter</td><td>Damage</td><td>Attack
</td></tr>
<tr><td>99</td><td>Metal</td><td>Golem</td><td>Punch, Charge, Crush</td><td>Meele</td><td>Fighter</td><td>Bruiser</td><td>Defensive
</td></tr>
<tr><td>100</td><td>Electro, Light</td><td>Golem</td><td>Electric Strike, Blinding light, Static electricity, Electric barrage</td><td>Range</td><td>Mage</td><td>Damage</td><td>Defensive
</td></tr>
<tr><td>101</td><td>Metal</td><td>Beast</td><td>Punch, Evasion, Back stab</td><td>Meele</td><td>Fighter</td><td>Bruiser</td><td>Defensive
</td></tr>
<tr><td>102</td><td>Light</td><td>Beast</td><td>Magic Aura, Light Beam, Magic Shield, Cleanse</td><td>Range</td><td>Mage</td><td>Buffer</td><td>Balance
</td></tr>
<tr><td>103</td><td>Light</td><td>Beast</td><td>Magic Aura, Light Strike, Light Blast</td><td>Range</td><td>Mage</td><td>Damage</td><td>Balance
</td></tr>
<tr><td>104</td><td>Metal</td><td>Golem</td><td>Charge, Tail strike</td><td>Meele</td><td>Fighter</td><td>Damage</td><td>Defensive
</td></tr>
<tr><td>105</td><td>Metal, Earth</td><td>Spirit</td><td>Earth Strike, Earth Weakness, Earthquake, Slow</td><td>Range</td><td>Mage</td><td>Damage</td><td>Balance
</td></tr>
<tr><td>106</td><td>Nature</td><td>Beast</td><td>Punch, Guardian, Evasion</td><td>Meele</td><td>Fighter</td><td>Durability</td><td>Balance
</td></tr>
<tr><td>107</td><td>Nature, Earth</td><td>Beast</td><td>Retaliation, Spiked bullets, Toxic shot</td><td>Range</td><td>Fighter</td><td>Damage</td><td>Defensive
</td></tr>
<tr><td>108</td><td>Dark</td><td>Beast</td><td>Charge, Shadow strike, Shadow Wave</td><td>Meele</td><td>Mage</td><td>Damage</td><td>Balance
</td></tr>
<tr><td>109</td><td>Dark</td><td>Beast</td><td>Charge, Fear, Disarm</td><td>Meele</td><td>Mage</td><td>Buffer</td><td>Balance
</td></tr>
</table>
